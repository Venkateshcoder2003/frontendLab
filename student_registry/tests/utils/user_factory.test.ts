import { UserFactory } from "../../utils/user_factory";
import { User } from "../../models/user";
import Course from "../../models/course";

describe("UserFactory", () => {
  let userFactory: UserFactory;

  beforeEach(() => {
    userFactory = new UserFactory();
  });

  describe("createUser", () => {
    it("should create a user with valid data", () => {
      const user = userFactory.createUser(
        "John Doe",
        20,
        "123 Main St",
        1001,
        Course.A
      );

      expect(user).toEqual({
        fullName: "John Doe",
        age: 20,
        address: "123 Main St",
        rollNumber: 1001,
        courses: Course.A,
      });
    });

    it("should trim whitespace from name and address", () => {
      const user = userFactory.createUser(
        "  Alice Smith  ",
        19,
        "  456 Oak Ave  ",
        1002,
        Course.B
      );

      expect(user.fullName).toBe("Alice Smith");
      expect(user.address).toBe("456 Oak Ave");
    });

    it("should handle empty strings after trimming", () => {
      const user = userFactory.createUser("   ", 25, "   ", 1003, Course.C);

      expect(user.fullName).toBe("");
      expect(user.address).toBe("");
    });

    it("should handle different course types", () => {
      const courses = [
        Course.A,
        Course.B,
        Course.C,
        Course.D,
        Course.E,
        Course.F,
      ];

      courses.forEach((course, index) => {
        const user = userFactory.createUser(
          `Student ${index}`,
          20 + index,
          `Address ${index}`,
          1000 + index,
          course
        );

        expect(user.courses).toBe(course);
      });
    });

    it("should handle numeric edge cases", () => {
      const user = userFactory.createUser(
        "Test User",
        0,
        "Test Address",
        0,
        Course.A
      );

      expect(user.age).toBe(0);
      expect(user.rollNumber).toBe(0);
    });
  });
});
