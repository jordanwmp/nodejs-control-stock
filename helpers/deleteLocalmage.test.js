const fs = require('fs')
const path = require('path')
const deleteLocalImage = require('./deleteLocalImage')

jest.mock('fs')

describe('deleteLocalImage', () => {

    it('should delete the image if it exists', (done) => {
        
      const imageName = 'testImage.jpg';
      const filePath = path.join(__dirname, '../public/uploads', imageName);
      
      fs.unlink.mockImplementation((filePath, callback) => {
        callback(null); // Simulate successful deletion
      });
  
      console.log = jest.fn(); // Mock console.log
  
      deleteLocalImage(imageName);
  
      setImmediate(() => {
        expect(fs.unlink).toHaveBeenCalledWith(filePath, expect.any(Function));
        expect(console.log).toHaveBeenCalledWith('Local image delete successfully');
        done();
      });
    });
  
    it('should log an error if deletion fails', (done) => {
      const imageName = 'testImage.jpg';
      const filePath = path.join(__dirname, '../public/uploads', imageName);
      const mockError = new Error('Mock error');
  
      fs.unlink.mockImplementation((filePath, callback) => {
        callback(mockError); // Simulate deletion error
      });
  
      console.log = jest.fn(); // Mock console.log
  
      deleteLocalImage(imageName);
  
      setImmediate(() => {
        expect(fs.unlink).toHaveBeenCalledWith(filePath, expect.any(Function));
        expect(console.log).toHaveBeenCalledWith('Local image not delete ', mockError);
        done();
      });
    });
  
    it('should log an error if an exception occurs', () => {
      const imageName = 'testImage.jpg';
  
      const mockError = new Error('Mock exception');
  
      path.join = jest.fn().mockImplementation(() => {
        throw mockError;
      });
  
      console.log = jest.fn(); // Mock console.log
  
      deleteLocalImage(imageName);
  
      expect(console.log).toHaveBeenCalledWith('Error on delete local image ', mockError);
    });
  });
  