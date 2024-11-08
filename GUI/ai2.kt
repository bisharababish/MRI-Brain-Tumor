@Suppress("DEPRECATION")
class MainActivity : AppCompatActivity() {

    private lateinit var btnCapture: ImageButton
    private lateinit var btnBack: ImageButton
    private lateinit var btnGallery: ImageButton
    private lateinit var previewView: PreviewView
    private lateinit var imgResult: ImageView
    private lateinit var tvScanning: TextView
    private lateinit var tvLeafArea: TextView
    private lateinit var doneButton: Button

    private lateinit var cameraExecutor: ExecutorService
    private lateinit var imageCapture: ImageCapture

    private val pixelToCmFactor = 0.017
    private val PICK_IMAGE_REQUEST = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnCapture = findViewById(R.id.btnCapture)
        btnBack = findViewById(R.id.btnBack)
        btnGallery = findViewById(R.id.btnGallery)
        previewView = findViewById(R.id.previewView)
        imgResult = findViewById(R.id.imgResult)
        tvScanning = findViewById(R.id.tvScanning)
        tvLeafArea = findViewById(R.id.tvLeafArea)
        doneButton = findViewById(R.id.doneButton)

        if (!OpenCVLoader.initLocal()) {
            Log.d("OpenCV", "Initialization failed")
        } else {
            Log.d("OpenCV", "Initialization succeeded")
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                arrayOf(Manifest.permission.CAMERA),
                0)
        } else {
            startCamera()
        }

        btnCapture.setOnClickListener {
            takePhoto()
        }

        btnBack.setOnClickListener {
            navigateToHomeActivity()
        }

        btnGallery.setOnClickListener {
            openGallery()
        }

        doneButton.setOnClickListener {
            resetView()
        }

        cameraExecutor = Executors.newSingleThreadExecutor()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<out String>, grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 0) {
            if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                startCamera()
            } else {
                Toast.makeText(this, "Camera permission is required", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(previewView.surfaceProvider)
                }

            imageCapture = ImageCapture.Builder()
                .setTargetResolution(Size(640, 480))
                .build()

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this, CameraSelector.DEFAULT_BACK_CAMERA, preview, imageCapture)
            } catch (exc: Exception) {
                Log.e("CameraX", "Use case binding failed", exc)
                runOnUiThread {
                    Toast.makeText(this, "Failed to start camera: ${exc.message}", Toast.LENGTH_LONG).show()
                }
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun takePhoto() {
        tvScanning.visibility = View.GONE // Hide the "Scanning" text

        val photoFile: File? = try {
            File.createTempFile("leaf_", ".jpg")
        } catch (ex: IOException) {
            Log.e("CameraX", "Unable to create temporary file", ex)
            Toast.makeText(this, "Failed to create file", Toast.LENGTH_SHORT).show()
            null
        }

        photoFile?.let {
            val outputOptions = ImageCapture.OutputFileOptions.Builder(it).build()

            imageCapture.takePicture(
                outputOptions, ContextCompat.getMainExecutor(this),
                object : ImageCapture.OnImageSavedCallback {
                    override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                        val bitmap = BitmapFactory.decodeFile(it.absolutePath)
                        Log.d("MainActivity", "Image saved, starting processing")
                        Thread {
                            val processedBitmap = processImageWithOpenCV(bitmap)
                            runOnUiThread {
                                Log.d("MainActivity", "Image processing completed")
                                imgResult.setImageBitmap(processedBitmap)
                                imgResult.visibility = View.VISIBLE
                                tvLeafArea.visibility = View.VISIBLE
                                doneButton.visibility = View.VISIBLE
                            }
                        }.start()
                    }

                    override fun onError(exception: ImageCaptureException) {
                        Log.e("CameraX", "Photo capture failed: ${exception.message}", exception)
                    }
                })
        }
    }

    private fun openGallery() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, PICK_IMAGE_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK) {
            val selectedImageUri: Uri? = data?.data
            selectedImageUri?.let {
                val bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, it)
                Log.d("MainActivity", "Image selected from gallery, starting processing")
                Thread {
                    val processedBitmap = processImageWithOpenCV(bitmap)
                    runOnUiThread {
                        Log.d("MainActivity", "Image processing completed")
                        imgResult.setImageBitmap(processedBitmap)
                        imgResult.visibility = View.VISIBLE
                        tvLeafArea.visibility = View.VISIBLE
                        doneButton.visibility = View.VISIBLE
                    }
                }.start()
            }
        }
    }

    private fun processImageWithOpenCV(bitmap: Bitmap): Bitmap {
        Log.d("OpenCV", "Processing image")

        val flippedBitmap = flipBitmap(bitmap)

        val src = Mat()
        Utils.bitmapToMat(flippedBitmap, src)
        val processedResult = processImage(src)

        val drawing = Mat.zeros(src.size(), CvType.CV_8UC3)
        Imgproc.drawContours(drawing, processedResult.segmentedLeaves, -1, Scalar(0.0, 255.0, 0.0), 2)

        val totalLeafAreaCm2 = processedResult.areas.sum() * pixelToCmFactor * pixelToCmFactor
        runOnUiThread {
            tvLeafArea.text = "Leaf Area: %.2f cm²".format(totalLeafAreaCm2)
            tvLeafArea.visibility = View.VISIBLE
        }

        val resultBitmap = Bitmap.createBitmap(drawing.cols(), drawing.rows(), Bitmap.Config.ARGB_8888)
        Utils.matToBitmap(drawing, resultBitmap)
        return resultBitmap
    }

    private fun processImage(inputImage: Mat): ProcessedResult {
        val detectedLeaves = detectLeaves(inputImage)
        val segmentedLeaves = segmentLeaves(inputImage, detectedLeaves)
        val areas = calculateAreas(segmentedLeaves)

        return ProcessedResult(
            processedImage = inputImage,
            detectedLeaves = detectedLeaves,
            segmentedLeaves = segmentedLeaves,
            areas = areas
        )
    }

    private fun detectLeaves(inputImage: Mat): List<Rect> {
        val leafRectangles = mutableListOf<Rect>()

        val gray = Mat()
        Imgproc.cvtColor(inputImage, gray, Imgproc.COLOR_BGR2GRAY)
        Imgproc.GaussianBlur(gray, gray, Size(5.0, 5.0), 0.0)
        Imgproc.Canny(gray, gray, 50.0, 150.0)
        val contours = mutableListOf<MatOfPoint>()
        val hierarchy = Mat()
        Imgproc.findContours(gray, contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE)

        for (contour in contours) {
            val boundingRect = Imgproc.boundingRect(contour)
            leafRectangles.add(boundingRect)
        }

        return leafRectangles
    }

    private fun segmentLeaves(inputImage: Mat, detectedLeaves: List<Rect>): List<MatOfPoint> {
        val segmentedLeaves = mutableListOf<MatOfPoint>()

        val gray = Mat()
        Imgproc.cvtColor(inputImage, gray, Imgproc.COLOR_BGR2GRAY)
        Imgproc.GaussianBlur(gray, gray, Size(5.0, 5.0), 0.0)
        Imgproc.Canny(gray, gray, 50.0, 150.0)
        val contours = mutableListOf<MatOfPoint>()
        val hierarchy = Mat()
        Imgproc.findContours(gray, contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE)

        for (contour in contours) {
            val boundingRect = Imgproc.boundingRect(contour)
            if (detectedLeaves.contains(boundingRect)) {
                segmentedLeaves.add(contour)
            }
        }

        return segmentedLeaves
    }

    private fun calculateAreas(segmentedLeaves: List<MatOfPoint>): List<Double> {
        val areas = mutableListOf<Double>()

        for (leaf in segmentedLeaves) {
            val area = Imgproc.contourArea(leaf)
            areas.add(area)
        }

        return areas
    }

    private fun flipBitmap(bitmap: Bitmap): Bitmap {
        val matrix = Matrix()
        matrix.preScale(-1.0f, 1.0f) // Flip horizontally
        return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
    }

    private fun resetView() {
        imgResult.visibility = View.GONE
        tvLeafArea.visibility = View.GONE
        doneButton.visibility = View.GONE
        previewView.visibility = View.VISIBLE
        tvScanning.visibility = View.VISIBLE
    }

    private fun navigateToHomeActivity() {
        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }
}

data class ProcessedResult(
    val processedImage: Mat,
    val detectedLeaves: List<Rect>,
    val segmentedLeaves: List<MatOfPoint>,
    val areas: List<Double>
)