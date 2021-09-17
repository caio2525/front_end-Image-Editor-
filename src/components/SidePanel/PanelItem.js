import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #000;
  &:hover{
    background: #d60088;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`

const Label = styled.span`
  font-size: 18px;
  text-align: center;
`

const DropDownDiv = styled.div`
  background:#cfdae3;
  height: 50px;
  padding-left: 3rem;
  align-items: center;
  justify-content: center;
  padding: 5px;
  &:hover{
    background: #632ce4;
    cursor: pointer;
  }
`

function PanelItem({item, setModalBody, setModalTitle, handleOpen, setInputTarget, setRangeInput, setFuncao  })
{
  const [subNavShow, setSubNavShow] = useState(false);

  const toggleSubNav = () => setSubNavShow(!subNavShow);

  return(
    <>
      <Div onClick={() => toggleSubNav()}>
        <Label>{item.title}</Label>
        <div>
          {
            subNavShow
            ? <FontAwesomeIcon icon={faAngleUp} />
            : <FontAwesomeIcon icon={faAngleDown} />
          }
        </div>
      </Div>
      {
        subNavShow && item.subNav.map((subItem, index) => {
          return(
            <DropDownDiv
              key={index}
              onClick={() => {
                  setRangeInput({
                    max: subItem.max,
                    min: subItem.min,
                    stpe: subItem.step,
                  })
                  setModalBody(subItem.modalBody)
                  setModalTitle(subItem.title)
                  setInputTarget(subItem.requiredInput)
                  handleOpen()
                  setFuncao(() => subItem.funcao)
              }}
            >
              <Label>{subItem.title}</Label>
            </DropDownDiv>
          )
        })
      }
    </>
  )
}

export default PanelItem;
