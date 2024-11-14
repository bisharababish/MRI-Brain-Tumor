import sys
from PyQt5.QtWidgets import (QApplication, QWidget, QVBoxLayout, QPushButton, QFileDialog, QLabel, QMessageBox, QProgressBar, QListWidget)
from PyQt5.QtCore import Qt, QThread, pyqtSignal
from PyQt5.QtGui import QDragEnterEvent, QDropEvent, QPixmap, QImage
from fpdf import FPDF
import pydicom
import os
import time

# AI Processing Simulation
class AILoaderThread(QThread):
    update_progress = pyqtSignal(int)
    result_ready = pyqtSignal(str)

    def __init__(self, file_path):
        super().__init__()
        self.file_path = file_path

    def run(self):
        start_time = time.time()
        for i in range(101):
            self.update_progress.emit(i)
            time.sleep(0.03)  # Simulating AI processing delay
        # Simulate AI result
        result = "EMPTY"
        processing_time = time.time() - start_time
        self.result_ready.emit(f"{result} (Processed in {processing_time:.2f}s)")

class FileUploader(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("MRI Brain Tumor Recognition")
        self.setGeometry(100, 100, 700, 600)
        self.setAcceptDrops(True)
        self.layout = QVBoxLayout()

        # Upload Section
        self.upload_section()

        # File History
        self.file_history_section()

        # Set Layout
        self.setLayout(self.layout)

    def upload_section(self):
        # Upload Button
        self.upload_button = QPushButton("Upload MRI/DICOM File", self)
        self.upload_button.clicked.connect(self.open_file_dialog)
        self.layout.addWidget(self.upload_button)

        # File Path Label
        self.file_label = QLabel("No file selected", self)
        self.layout.addWidget(self.file_label)

        # Image Display
        self.image_label = QLabel(self)
        self.image_label.setAlignment(Qt.AlignCenter)
        self.layout.addWidget(self.image_label)

        # AI Processing Result Label
        self.result_label = QLabel("AI Result: Not processed yet", self)
        self.layout.addWidget(self.result_label)

        # Progress Bar
        self.progress_bar = QProgressBar(self)
        self.progress_bar.setValue(0)
        self.layout.addWidget(self.progress_bar)

        # Download Button
        self.pdf_button = QPushButton("Generate Result as PDF", self)
        self.pdf_button.setEnabled(False)
        self.pdf_button.clicked.connect(self.download_pdf)
        self.layout.addWidget(self.pdf_button)

    def file_history_section(self):
        # File History List
        self.history_label = QLabel("File History:", self)
        self.layout.addWidget(self.history_label)

        self.history_list = QListWidget(self)
        self.layout.addWidget(self.history_list)

    def open_file_dialog(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Select MRI or DICOM File", "", "Images (*.png *.xpm *.jpg *.jpeg *.bmp);;DICOM Files (*.dcm)")
        if file_path:
            if self.validate_file(file_path):
                self.file_label.setText(f"Selected File: {file_path}")
                self.display_image(file_path)
                self.process_file(file_path)
            else:
                QMessageBox.critical(self, "Invalid File", "The selected file is not a valid MRI or DICOM format.")
        else:
            self.file_label.setText("No file selected")

    def validate_file(self, file_path):
        valid_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.dcm')
        if file_path.lower().endswith(valid_extensions):
            if file_path.lower().endswith('.dcm'):
                try:
                    # Try reading the DICOM file
                    dicom = pydicom.dcmread(file_path)
                    return True
                except Exception as e:
                    QMessageBox.critical(self, "Error", f"Failed to load DICOM file: {str(e)}")
                    return False
            return True
        return False

    def display_image(self, file_path):
        if file_path.lower().endswith('.dcm'):
            dicom = pydicom.dcmread(file_path)
            pixel_array = dicom.pixel_array
            # Convert pixel_array to QPixmap for display
            image = QImage(pixel_array, pixel_array.shape[1], pixel_array.shape[0], QImage.Format_Grayscale8)
            pixmap = QPixmap.fromImage(image)
            self.image_label.setPixmap(pixmap.scaled(400, 300, Qt.KeepAspectRatio))
        else:
            pixmap = QPixmap(file_path)
            self.image_label.setPixmap(pixmap.scaled(400, 300, Qt.KeepAspectRatio))

    def process_file(self, file_path):
        self.progress_bar.setValue(0)
        self.pdf_button.setEnabled(False)
        self.ai_thread = AILoaderThread(file_path)
        self.ai_thread.update_progress.connect(self.progress_bar.setValue)
        self.ai_thread.result_ready.connect(self.on_ai_result_ready)
        self.ai_thread.start()

    def on_ai_result_ready(self, result):
        self.result_label.setText(f"AI Result: {result}")
        self.history_list.addItem(f"{self.file_label.text()}: {result}")
        self.pdf_button.setEnabled(True)

    def download_pdf(self):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=10)
        pdf.cell(200, 10, txt="MRI Brain Tumor Recognition Result", ln=True, align='C')
        pdf.ln(10)
        pdf.cell(200, 10, txt=f"File: {self.file_label.text()}", ln=True)
        pdf.cell(200, 10, txt=f"Analysis Timestamp: {time.ctime()}", ln=True)
        pdf.cell(200,10, txt=f"Tensity")
        pdf.ln(10)
        pdf.cell(200, 10, txt=self.result_label.text(), ln=True)
    
    # Check if the file is a DICOM file
        if self.file_label.text().lower().endswith('.dcm'):
            pdf.cell(200, 10, txt="DICOM File Image is not included in PDF.", ln=True)
        else:
        # Add the image to the PDF only if it's not a DICOM file
            image_path = self.file_label.text().replace("Selected File: ", "")
            pdf.image(image_path, x=10, y=None, w=180)
    
        save_path, _ = QFileDialog.getSaveFileName(self, "Save PDF", "", "PDF Files (*.pdf)")
        if save_path:
            pdf.output(save_path)
            QMessageBox.information(self, "Success", f"PDF saved at {save_path}")
        else:
            QMessageBox.warning(self, "Cancelled", "PDF not saved")

    def dragEnterEvent(self, event: QDragEnterEvent):
        if event.mimeData().hasUrls():
            event.acceptProposedAction()
        else:
            event.ignore()

    def dropEvent(self, event: QDropEvent):
        if event.mimeData().hasUrls():
            file_path = event.mimeData().urls()[0].toLocalFile()
            if self.validate_file(file_path):
                self.file_label.setText(f"Selected File: {file_path}")
                self.display_image(file_path)
                self.process_file(file_path)
                event.acceptProposedAction()
            else:
                QMessageBox.critical(self, "Invalid File", "The dropped file is not a valid MRI/DICOM format.")
                event.ignore()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    uploader = FileUploader()
    uploader.show()
    sys.exit(app.exec_())
