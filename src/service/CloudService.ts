const uploadImage = async (formData: FormData) => {
  return fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
};

const CloudinaryService = { uploadImage };

export default CloudinaryService;
