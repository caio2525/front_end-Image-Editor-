import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import '../App.css';

const mapa = {
  gaussinNoiseSigma: "Gaussian Noise Sigma",
  spNoiseProportion: "Salt and pepper noise image ratio",
  gaussianFilterKernelSize: "Gaussian Filter Kernel Size",
  gaussianFilterSigma: "Guassian Filter Sigma",
  boxFilterKernelSize: "Box Filter Kernel Size",
  medianFilterKernelSize: "Median Filter Kernel Size",
  unsharpMaskKernelSize: "Unsharp Mask Kernel Size"
}

function ModalComponent({show, handleClose, title, body, inputTarget, rangeInput, funcao, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia}) {

  const [requiredInput, setRequiredInput] = useState(
    {
      gaussinNoiseSigma:0,

      spNoiseProportion: 0.0,

      gaussianFilterKernelSize: 0,
      gaussianFilterSigma: 0,

      boxFilterKernelSize: 0,

      medianFilterKernelSize: 0,

      unsharpMaskKernelSize: 0,

    }
  );

  const callFunction = () => {
      var arr = []
      for (var i = 0; i < inputTarget.length; i++)
      {
          arr.push(
            requiredInput[inputTarget[i]]
          )
      }
      console.log(arr)
      funcao(arr, uploadedImage, setUploadedImage, setImageUrl, setImagemPrevia)
  }

  return(

      <Modal centered show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {body}
          </div>
          <div>
            <form>
              {
                inputTarget.map((input, index) => {
                  return(
                    <div key={index}>
                      <label>{`${mapa[input]}: `}</label>
                      <input
                        className="Modal-input"
                        value={requiredInput[input]}
                        onChange={(event) => {
                          setRequiredInput({
                            ...requiredInput,
                            [input]: event.target.value,

                          })

                        }}
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={rangeInput.min}
                        max={rangeInput.max}
                        step= {input==='spNoiseProportion' ? "0.01" : "1"} />
                    </div>
                  )
                })
              }
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            callFunction()
            handleClose()
          }}>
            Aplicar
          </Button>
        </Modal.Footer>

      </Modal>

  )
}

export default ModalComponent;
