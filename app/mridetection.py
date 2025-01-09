import random
import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton, QFileDialog,
    QLabel, QMessageBox, QProgressBar, QListWidget, QHBoxLayout
)
from PyQt5.QtCore import Qt, QThread, pyqtSignal
from PyQt5.QtGui import QPixmap, QImage
from fpdf import FPDF
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
            time.sleep(0.03)
        result = "No Tumor Detected"  # Simulated AI result
        processing_time = time.time() - start_time
        self.result_ready.emit(f"{result} (Processed in {processing_time:.2f}s)")


class FileUploader(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("MRI Brain Tumor Recognition")
        self.setGeometry(100, 100, 800, 600)
        self.setAcceptDrops(True) 
        self.layout = QVBoxLayout()
        self.upload_section()
        self.file_history_section()
        self.setLayout(self.layout)

    def upload_section(self):
        section_layout = QVBoxLayout()

        self.upload_button = QPushButton("Upload File")
        self.upload_button.clicked.connect(self.open_file_dialog)
        section_layout.addWidget(self.upload_button)

        self.file_label = QLabel("No file selected")
        self.file_label.setStyleSheet("font-weight: bold; color: #555;")
        section_layout.addWidget(self.file_label)

        self.image_label = QLabel()
        self.image_label.setAlignment(Qt.AlignCenter)
        self.image_label.setStyleSheet("border: 1px solid #ddd; background-color: #f9f9f9;")
        self.image_label.setFixedHeight(300)
        section_layout.addWidget(self.image_label)

        self.result_label = QLabel("AI Result: Not processed yet")
        self.result_label.setStyleSheet("font-weight: bold; color: #007BFF;")
        section_layout.addWidget(self.result_label)

        self.progress_bar = QProgressBar()
        section_layout.addWidget(self.progress_bar)

        self.pdf_button = QPushButton("Generate Result as PDF")
        self.pdf_button.setEnabled(False)
        self.pdf_button.clicked.connect(self.download_pdf)
        section_layout.addWidget(self.pdf_button)

        self.layout.addLayout(section_layout)

    def file_history_section(self):
        section_layout = QVBoxLayout()

        self.history_label = QLabel("File History:")
        self.history_label.setStyleSheet("font-weight: bold; color: #333;")
        section_layout.addWidget(self.history_label)

        self.history_list = QListWidget()
        self.history_list.setStyleSheet("background-color: #f7f7f7; border: 1px solid #ddd;")
        section_layout.addWidget(self.history_list)

        self.layout.addLayout(section_layout)

    def open_file_dialog(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Select File", "", "All Files (*)")
        if file_path:
            self.handle_file(file_path)

    def dragEnterEvent(self, event):
        if event.mimeData().hasUrls():
            event.accept()
        else:
            event.ignore()

    def dropEvent(self, event):
        urls = event.mimeData().urls()
        if urls:
            file_path = urls[0].toLocalFile()
            self.handle_file(file_path)

    def handle_file(self, file_path):
        if file_path:
            self.file_label.setText(f"Selected File: {file_path}")
            self.display_image(file_path)
            self.process_file(file_path)

    def display_image(self, file_path):
        pixmap = QPixmap(file_path)
        if not pixmap.isNull():
            self.image_label.setPixmap(pixmap.scaled(400, 300, Qt.KeepAspectRatio))
        else:
            self.image_label.setText("Unable to display this file.")

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
        pdf.set_font("Arial", 'B', 16)
        pdf.cell(0, 10, "MRI Brain Tumor Analysis Report", ln=True, align='C')
        pdf.ln(10)
        pdf.set_font("Arial", '', 12)
        random_mrn = random.randint(100000, 999999)
        pdf.cell(0, 10, f"Patient Medical Record Number: {random_mrn}", ln=True)
        pdf.cell(0, 10, f"Examination Date: {time.ctime()}", ln=True)
        pdf.ln(10)
        pdf.set_font("Arial", 'B', 14)
        pdf.cell(0, 10, "Analysis Results", ln=True)
        pdf.set_font("Arial", '', 12)
        pdf.cell(0, 10, "Tumor Name: [Tumor Name]", ln=True)
        pdf.cell(0, 10, "Tumor Identification: [Tumor Identification]", ln=True)
        pdf.cell(0, 10, "Tumor Type: [Tumor Type]", ln=True)
        pdf.cell(0, 10, "Tumor Locations: [Tumor Locations]", ln=True)
        pdf.ln(10)

        uploaded_file = self.file_label.text().split(": ")[-1]
        if os.path.exists(uploaded_file):
            try:
                pdf.image(uploaded_file, x=10, y=pdf.get_y(), w=180)
            except Exception:
                pdf.cell(0, 10, "Unable to embed the image in this report.", ln=True)
        pdf.ln(20)

        save_path, _ = QFileDialog.getSaveFileName(self, "Save PDF", "", "PDF Files (*.pdf);;All Files (*)")
        if save_path:
            try:
                pdf.output(save_path)
                QMessageBox.information(self, "Success", f"PDF saved at {save_path}")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save PDF: {e}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    uploader = FileUploader()
    uploader.show()
    sys.exit(app.exec_())
