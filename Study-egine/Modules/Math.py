class MathModule:
    def __init__(self, focus):
        self.focus = focus

    def solve(self, data):
        if self.focus == "chu vi":
            return 2 * (data["a"] + data["b"])

        if self.focus == "diện tích":
            return data["a"] * data["b"]

        return None
