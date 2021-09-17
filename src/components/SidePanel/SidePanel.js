import React from 'react';
import styled from 'styled-components';
import {SidePanelData} from './SidePanelData';
import PanelItem from './PanelItem';

const Nav = styled.nav`
  background: #c5c5c5;
  width: 250px;
`
function SidePanel({setModalBody, setModalTitle, handleOpen, setInputTarget, setRangeInput, setFuncao})
{
  return(
    <>
      <Nav>
        {
          SidePanelData.map((item, index) => {
            return(<PanelItem
                      setFuncao={setFuncao}
                      setRangeInput={setRangeInput}
                      setInputTarget={setInputTarget}
                      handleOpen={() => handleOpen()}
                      setModalBody={(body) => setModalBody(body)}
                      setModalTitle={(title) => setModalTitle(title)}
                      item={item}
                      key={index}/>)
          })
        }
      </Nav>
    </>
  )
}

export default SidePanel;
