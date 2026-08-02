import os
import json
import re
# Yêu cầu cài đặt: pip install pytesseract Pillow
try:
    import pytesseract
    from PIL import Image
except ImportError:
    print("Vui lòng cài đặt thư viện: pip install pytesseract Pillow")
    print("Và đảm bảo đã cài đặt Tesseract-OCR trên máy tính của bạn.")
    exit()

# TODO: Sửa lại đường dẫn Tesseract.exe nếu máy bạn cài ở chỗ khác
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_answer_from_image(image_path):
    """
    Hàm đọc ảnh và dùng OCR để tìm ra đáp án đúng (A, B, C, D).
    """
    try:
        img = Image.open(image_path)
        # Sử dụng OCR quét text từ ảnh
        text = pytesseract.image_to_string(img, lang='eng+vie')
        
        # Regex tìm đáp án. Cần điều chỉnh tùy theo format của ảnh đáp án.
        # Ví dụ tìm chữ "Đáp án: A" hoặc "Correct: B" hoặc chữ A,B,C,D đứng một mình.
        # Ở đây làm mẫu tìm "A", "B", "C", "D" được khoanh hoặc in đậm, thường hay có dấu chấm theo sau (Ví dụ: "A.", "B.")
        matches = re.findall(r'\b([A-D])\b', text)
        
        if matches:
            # Trả về kết quả tìm được đầu tiên, hoặc bạn có thể viết logic phức tạp hơn
            return matches[0]
        else:
            return "A" # Mặc định nếu OCR không đọc được
    except Exception as e:
        print(f"Lỗi khi đọc ảnh {image_path}: {e}")
        return "A"

def generate_subject_data(subject_id, de_folder, dapan_folder):
    """
    Hàm quét 2 thư mục ảnh đề và đáp án, sau đó tạo file data/<subject_id>.js
    """
    if not os.path.exists(de_folder) or not os.path.exists(dapan_folder):
        print(f"Không tìm thấy thư mục {de_folder} hoặc {dapan_folder}")
        return

    data = []
    
    # Lấy danh sách các file ảnh trong thư mục Đề (sắp xếp theo tên)
    de_files = sorted([f for f in os.listdir(de_folder) if f.endswith(('.png', '.jpg', '.jpeg'))])
    
    for filename in de_files:
        question_path = f"images/{de_folder}/{filename}"
        answer_path = f"images/{dapan_folder}/{filename}" # Giả định tên file đáp án giống hệt tên file đề
        
        full_answer_img_path = os.path.join(dapan_folder, filename)
        
        # Quét OCR để lấy đáp án A, B, C, D
        correct_opt = "A"
        if os.path.exists(full_answer_img_path):
            correct_opt = extract_answer_from_image(full_answer_img_path)
            print(f"[{filename}] OCR tìm thấy đáp án: {correct_opt}")
        else:
            print(f"[{filename}] Không tìm thấy file đáp án tương ứng!")

        # Map correct_opt (A,B,C,D) thành index (0,1,2,3) để phục vụ chấm điểm
        opt_map = {"A": 0, "B": 1, "C": 2, "D": 3}
        answer_idx = opt_map.get(correct_opt, 0)

        # Tạo object câu hỏi định dạng Ảnh
        q_obj = {
            "type": "image",
            "term": "Câu hỏi hình ảnh", # Text hiển thị tạm
            "question_img": question_path,
            "definition": "Lời giải hình ảnh", # Text hiển thị tạm
            "answer_img": answer_path,
            "options": ["A", "B", "C", "D"],
            "answerIndex": answer_idx,
            "ocr_correct": correct_opt
        }
        data.append(q_obj)

    # Ghi ra file JS định dạng window.studyData
    out_file = f"data/{subject_id}.js"
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write("if (!window.studyData) window.studyData = {};\n")
        json_data = json.dumps(data, indent=4, ensure_ascii=False)
        f.write(f"window.studyData['{subject_id}'] = {json_data};\n")
    
    print(f"\n=> Đã tạo xong file {out_file} với {len(data)} câu hỏi!")

if __name__ == "__main__":
    print("--- CÔNG CỤ OCR TẠO DỮ LIỆU TỪ ẢNH ---")
    # Thay đổi tên thư mục tương ứng với môn học của bạn
    # Ví dụ: de_CSD202 và dapan_CSD202
    # Đảm bảo bạn đã copy 2 thư mục này vào chung chỗ với file script.
    
    generate_subject_data("csd202", "de_CSD202", "dapan_CSD202")
