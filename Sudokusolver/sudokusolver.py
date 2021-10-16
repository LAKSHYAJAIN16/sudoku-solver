import cv2
import os
import numpy as np

# a function to read the 
def read_img(self):
    print("Enter image name: ")
    image_url = input()
    self.img = cv2.imread(image_url, img = cv2.imread(image_url, cv2.IMREAD_GRAYSCALE)