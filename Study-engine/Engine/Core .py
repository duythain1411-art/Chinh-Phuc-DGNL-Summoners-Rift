class Question:
    def __init__(self, subject, q_type, data, text):
        self.subject = subject
        self.q_type = q_type
        self.data = data
        self.text = text
      from modules.math import MathModule


class Engine:
    def run(self, question: Question):
        focus = self.find_focus(question.text)
        module = self.select_module(question.subject, focus)
        result = module.solve(question.data)
        return result

    def find_focus(self, text):
        keywords = ["chu vi", "diện tích", "tính", "tìm"]
        for k in keywords:
            if k in text.lower():
                return k
        return None

    def select_module(self, subject, focus):
        if subject == "Toán":
            return MathModule(focus)
        raise Exception("Không có module phù hợp")
