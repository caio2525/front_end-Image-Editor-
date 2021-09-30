import './App.css';
import { useState } from 'react';
import axios from "axios";
import ModalComponent from "./components/ModalComponent"
import SidePanel from './components/SidePanel/SidePanel';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const FallBackContainer = styled.div`
  position: fixed;
  top: calc(50% - 100);
  left: calc(50% - 100);
`

const ImgPreview = styled.div`

  margin: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 15px;
  
`


const ImageContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 10px;
  padding: 5px;
`

const Image = styled.img`
 width: 100%;
 height: 100%;
 object-fit: contain;
`
const Paragrafo = styled.p`
  font-size: 1rem;
`

function App() {

  const [spinner, setSpinner] = useState(false)
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [previousImage, setPreviousImage] = useState('');

  const setImagemPrevia = () => {
    setPreviousImage(imageUrl)
  }

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [inputTarget, setInputTarget] = useState(['', '']);
  const [rangeInput, setRangeInput] = useState({
    max: "0",
    min: "0",
    step: "0",
  })
  const [funcao, setFuncao] = useState(() => () => console.log('funcao'))

  const[sentinela1, setSentinela1] = useState(false);
  const[sentinela2, setSentinela2] = useState(false)

  const handleImageChange = (event) => {
    event.preventDefault();
    setSentinela1(true)
    setSentinela2(false)
    setPreviousImage('')

    let reader = new FileReader();
    let file = event.target.files[0];

    console.log('file', typeof(file))

    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    }
    reader.readAsDataURL(file)

  }

  const handleImageSubmit = () =>{
    //event.preventDefault();
    //console.log('handle uploading-', image);

    setSpinner(true);
    const fd = new FormData();
    fd.append('image', image, image.name)

    //console.log('type image', typeof(image))

    axios.post('https://us-central1-imageeditorserver.cloudfunctions.net/HelloWorld', fd)
      .then((response) => {
        console.log(response.status)
        //console.log(typeof(response.status))
        console.log(response.data)
        if(response.status === 200)
        {
          setUploadedImage(response.data)
          //setPreviousImage(imageUrl)
          setImageUrl('data:image/png;base64,'+response.data);
          setSentinela1(false)
          setSentinela2(true)
        }
        else {
          console.log('Deu Ruim')
        }
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        alert("Be sure to upload an image file");
        console.log('foi para o catch erro ', error)
      })
  }

  return (
    <Container>

      <div className="App">

        <div >
          <form className="FormContainer">

            <input
              type='file'
              onChange={(event) => handleImageChange(event)}
            />

          </form>
          {
            image
            ?
              <div>
                <p>File name: {image.name}</p>
                <p>File type: {image.type}</p>
              </div>
            : null
          }
        </div>

        <div className="flex-container">
          <div>
            {
              sentinela1
              ? <button
                type="submit"
                onClick={()=>{handleImageSubmit()}}>Start Editing</button>
              :null
            }
            {
              sentinela2
              ? <SidePanel
                setModalBody={(body) => setModalBody(body)}
                setModalTitle={(title) => setModalTitle(title)}
                setInputTarget={setInputTarget}
                handleOpen={() => setShow(true)}
                setRangeInput={setRangeInput}
                setFuncao={setFuncao}
              />
              : null
            }

          </div>

          <ImgPreview>

            {
              previousImage
              ? <ImageContainer>
                  <Paragrafo>Previous Image</Paragrafo>
                  <Image src={previousImage} alt='previous'/>
                </ImageContainer>
              : null
            }

            {
              imageUrl
              ? <ImageContainer>
                  <Paragrafo> Output Image </Paragrafo>
                  <Image src={imageUrl} alt='imageUploaded'/>
                </ImageContainer>
              : null
            }

           </ImgPreview>

        </div>
      </div>

      <ModalComponent
        show={show}
        title={modalTitle}
        body={modalBody}
        handleClose={() => setShow(false)}
        inputTarget={inputTarget}
        rangeInput={rangeInput}
        funcao={funcao}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setImageUrl={setImageUrl}
        setImagemPrevia={setImagemPrevia}
        setSpinner={setSpinner}
      />

      {
        spinner
        ? <FallBackContainer>
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100} //3 secs
            />
          </FallBackContainer>
        : null
      }

    </Container>
  );
}

export default App;
