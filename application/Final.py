import random
import sys
from PyQt5.QtWidgets import (QApplication, QWidget, QVBoxLayout, QPushButton, QFileDialog, QLabel, QMessageBox, QProgressBar, QListWidget)
from PyQt5.QtCore import Qt, QThread, pyqtSignal
from PyQt5.QtGui import QDragEnterEvent, QDropEvent, QPixmap, QImage
from fpdf import FPDF
import pydicom
import os
import time
import requests


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

        # Set document title
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(0, 10, "MRI Brain Tumor Analysis Report".encode('latin-1', 'ignore').decode('latin-1'), ln=True, align='C')
        pdf.ln(10)

        random_mrn = random.randint(100000, 999999)

        # Patient Demographics Section
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(0, 10, "Patient Medical Record Number:".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.set_font("Arial", '', 10)
        pdf.cell(0, 10, f"Medical Record Number: {random_mrn}".encode('latin-1', 'ignore').decode('latin-1'), ln=True)

        # Admission Details Section
        pdf.set_font("Arial", 'B', 12)
        pdf.cell(0, 10, "Admission Details".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.set_font("Arial", '', 10)
        pdf.cell(0, 10, f"Examination Date: {time.ctime()}".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Indication Evaluation: [Indication Evaluation]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Tumor Identification: [Tumor Identification]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Tumor Characteristics: [Tumor Characteristics]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "General Findings and Observations: [Overview]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Severity Assessment: [Severity Assessment]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Therapeutic Recommendations: [Treatment Plans]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)
        pdf.cell(0, 10, "Surgical Removability: [Feasibility of Tumor Resection]".encode('latin-1', 'ignore').decode('latin-1'), ln=True)

        # Add uploaded image if not DICOM
        pdf.ln(10)
        if self.file_label.text().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
            # If it's a standard image file
            pdf.image(self.file_label.text().split(": ")[-1], x=10, y=pdf.get_y(), w=180)  # Resizing to fit within page
        elif self.file_label.text().endswith('.dcm'):
            # If it's a DICOM file, convert pixel array to an image
            dicom = pydicom.dcmread(self.file_label.text().split(": ")[-1])
            pixel_array = dicom.pixel_array
            image = QImage(pixel_array, pixel_array.shape[1], pixel_array.shape[0], QImage.Format_Grayscale8)
            pixmap = QPixmap.fromImage(image)
            temp_image_path = os.path.join(os.path.expanduser("~"), "temp_image.jpg")
            pixmap.save(temp_image_path)
            pdf.image(temp_image_path, x=10, y=pdf.get_y(), w=180)  # Resizing to fit within page
        
        # Footer with Contact Information
        # pdf.ln(20)
        # pdf.set_font("Arial", 'I', 8)
        # footer_text = "Developed by Bishara Babish and Saliba Rishmawi - Graduation Project, 2025".replace("–", "-")  # Replacing em dash
        # pdf.cell(0, 10, footer_text.encode('latin-1', 'ignore').decode('latin-1'), align='C')

        # Prompt user to select file path and name for saving the PDF
        options = QFileDialog.Options()
        save_path, _ = QFileDialog.getSaveFileName(self, "Save PDF", "", "PDF Files (*.pdf);;All Files (*)", options=options)

        if save_path:
            try:
                pdf.output(save_path)
                QMessageBox.information(self, "Success", f"PDF saved at {save_path}")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save PDF: {e}")

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
                QMessageBox.critical(self, "Invalid File", "The dropped file is not a valid MRI or DICOM format.")
                event.ignore()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    uploader = FileUploader()
    uploader.show()
    sys.exit(app.exec_())
