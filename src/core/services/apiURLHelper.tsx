export const CheckEmailIdExistOrNot = (email: string) => {
  return "Registration/CheckEmailIdExistOrNot/" + email;
};

export const CreateRegistration = () => {
  return "Registration/CreateRegistration";
};

export const CheckAuthentication = () => {
  return "Login/CheckAuthentication";
};

export const GetUserProfile = (UserId: string) => {
  return "UserProfile/GetUserProfile/" + UserId;
};

export const SaveUserProfile = () => {
  return "UserProfile/SaveUserProfile";
};

export const GetWorkProfile = (UserId: string) => {
  return "UserProfile/GetWorkProfile/" + UserId;
};

export const SaveWorkProfile = () => {
  return "UserProfile/SaveWorkProfile";
};

export const GetAllEventTypes = () => {
  return "Requirement/GetAllEventTypes";
};

export const SaveRequirementPublish = () => {
  return "Requirement/SaveRequirementPublish";
};
