export const validateName = (name) => {
  if (!name || !name.trim()) return "Name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Name can only contain letters and spaces";
  return null;
};

export const validateCnic = (cnic) => {
  if (!cnic) return "CNIC is required";
  const digits = cnic.replace(/\D/g, "");
  if (digits.length !== 13) return "CNIC must be 13 digits";
  return null;
};

export const validateImage = (file) => {
  if (!file) return "Image is required";
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowed.includes(file.type)) return "Only JPG or PNG allowed";
  if (file.size > 1024 * 1024) return "Image must be less than 1 MB";
  return null;
};

export const validateQuantity = (qty, available) => {
  if (!qty || qty <= 0) return "Quantity must be greater than 0";
  if (available !== undefined && qty > available) {
    return `Only ${available} units available`;
  }
  return null;
};

export const validateCrop = (crop) => {
  if (!crop) return "Please select a crop";
  return null;
};

export const validateDate = (date) => {
  if (!date) return "Date is required";
  return null;
};