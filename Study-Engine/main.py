from engine.core import Engine, Question

question = Question(
    subject="Toán",
    q_type="trắc nghiệm",
    data={"a": 6, "b": 8},
    text="Tính chu vi hình chữ nhật"
)

engine = Engine()
result = engine.run(question)

print("Kết quả:", result)
