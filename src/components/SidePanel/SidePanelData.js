
import axios from "axios";

export const SidePanelData = [

  {
    title: 'Noise',
    subNav:[
      {
        title: 'Gaussian Noise',
        route: 'gaussianNoise',
        modalBody: 'Noise generated from a Gaussian distribution, also called a normal distribution.\n',
        requiredInput:['gaussinNoiseSigma'],
        min: "0",
        max: "255",
        step: "1",
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/gaussianNoise',{
              Sigma: params[0],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia();
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      },
      {
        title: 'Salt and Pepper Noise',
        route: 'saltPepperNoise',
        modalBody: 'It presents itself as sparsely occurring white and black pixels.\n',
        requiredInput:['spNoiseProportion'],
        min: 0.0,
        max: 1.0,
        step: 0.1,
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/saltPepperNoise',{
              Amount: params[0],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia();
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      }
    ]
  },

  {
    title: 'Filter',

    subNav:[
      {
        title: 'Box Filter',
        route: 'boxFilter',
        modalBody: 'The Box Filter replaces each pixel value with the average value of the surronding pixels.\nIt returns a blurred version of the original image.\n',
        requiredInput:['boxFilterKernelSize'],
        min: "0",
        max: "20",
        step: "1",
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/boxFilter',{
              KernelSize: params[0],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia()
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      },
      {
        title: 'Gaussian Filter',
        route: 'gaussianFilter',
        modalBody: 'It convolves the original image with a kernel generated from a gaussian distribution.\nThe resulting image is a blurred version of the original one.\n',
        requiredInput:['gaussianFilterKernelSize', 'gaussianFilterSigma'],
        min: "0",
        max: "255",
        step: "1",
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/gaussianFilter',{
              KernelSize: params[0],
              Sigma: params[1],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia();
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      },
      {
        title: 'Median Filter',
        route: 'medianFilter',
        modalBody: 'The Median Filter replaces each pixel value with the median value of the surronding pixels.\n',
        requiredInput:['medianFilterKernelSize'],
        min: "0",
        max: "20",
        step: "1",
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/medianFilter',{
              KernelSize: params[0],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia();
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      }
    ]
  },

  {
    title: 'Mask',

    subNav:[
      {
        title: 'Unsharp Mask',
        route: 'unsharpMask',
        modalBody: 'An "unsharp mask" is actually used to sharpen an image.\n',
        requiredInput:['unsharpMaskKernelSize'],
        min: "0",
        max: "11",
        step: "1",
        funcao: (params, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia) => {
          axios.post('http://127.0.0.1:5000/unsharpMask',{
              KernelSize: params[0],
              image: uploadedImage
            }, {headers: {'content-type': 'application/json'}}
          )
            .then(response => {
              console.log('sucesso ',response.status)
              setUploadedImage(response.data)
              setImagemPrevia();
              setImageUrl('data:image/png;base64,'+response.data);

            })
            .catch(erro => {
              console.log(erro)
            })
        }
      }
    ]
  },


]
