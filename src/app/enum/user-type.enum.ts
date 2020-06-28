enum UserTypeEnum {
  VISITOR = 1,
  DESIGNER = 2,
  CUSTOMER = 3,
  DC = 4,
  REVIEWER = 5,
  ADMIN = 6,
  SUPER_ADMIN = 7,
  ROOT_USER = 8
}

export {UserTypeEnum as USER_TYPE};

enum UserTypeText {
  VISITOR = 'Visitor',
  DESIGNER = 'Designer',
  CUSTOMER = 'Customer',
  DC = 'dc',
  REVIEWER = 'Reviewer',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
  ROOT_USER = 'Root User'
}

export {UserTypeText as USER_TYPE_TEXT};

function getUserTypeTextByEnum(type) {
  let type_text = null;
  switch (type) {
    case UserTypeEnum.VISITOR:
      type_text = UserTypeText.VISITOR
      break;
    case UserTypeEnum.DESIGNER:
      type_text = UserTypeText.DESIGNER
      break;
    case UserTypeEnum.CUSTOMER:
      type_text = UserTypeText.CUSTOMER
      break;
    case UserTypeEnum.DC:
      type_text = UserTypeText.DC
      break;
    case UserTypeEnum.REVIEWER:
      type_text = UserTypeText.REVIEWER
      break;
    case UserTypeEnum.ADMIN:
      type_text = UserTypeText.ADMIN
      break;
    case UserTypeEnum.SUPER_ADMIN:
      type_text = UserTypeText.SUPER_ADMIN
      break;
    case UserTypeEnum.ROOT_USER:
      type_text = UserTypeText.ROOT_USER
      break;

  }

  return type_text;
}

export {getUserTypeTextByEnum as USER_TYPE_TO_TEXT};
