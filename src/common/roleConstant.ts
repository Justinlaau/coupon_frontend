export class RoleConstant {
  static BASE: number = 0;
  static ADMIN: number = 1;
  static CLIENT: number = 2;
  static OWNER: number = 3;
  static MERCHANT: number = 4;
  static BUSINESS: number = 5;

  public static fromValue(val: number) {
    switch (val) {
      case 0:
        return "base";
      case 1:
        return "admin";
      case 2:
        return "client";
      case 3:
        return "owner";
      case 4:
        return "merchant";
      case 5:
        return "business";
      default:
        return "base";
    }
  }
}