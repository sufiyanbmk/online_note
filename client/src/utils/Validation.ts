 
  export const isValidName=(name:string)=> {
    const regex = /^[a-zA-Z\s'-]+$/;
    return regex.test(name);
  }
  export const isValidText = (text:string) => {
    const lettersRegex = /^[a-zA-Z\s]{4,}$/;
    return lettersRegex.test(text);
  }
  
  
  export const isValidEmail=(email:string)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  
  export function validatePassword(password:string) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 8;
  
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }
  
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
  
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
  
    if (!hasMinimumLength) {
      return 'Password must be at least 8 characters long';
    }
  
    return null;
  }