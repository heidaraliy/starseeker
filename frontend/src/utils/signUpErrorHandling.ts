export const validateEmail = (email: string): [boolean, string] => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return [false, 'Invalid email format.'];
  }
  return [true, ''];
};

export const validatePassword = (password: string): [boolean, string] => {
  if (password.length < 8 || !/[0123456789]/.test(password)) {
    return [
      false,
      'Password must be at least 8 characters long and contain a number.',
    ];
  }
  return [true, ''];
};
