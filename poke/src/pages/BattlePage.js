import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';
import Layout from './Layout';
import axios from 'axios';

const flicker = keyframes`
  0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% {
    opacity: 0.99;
    text-shadow: 
      -1px -1px 0 rgba(255,255,255, 0.4), 
      1px -1px 0 rgba(255,255,255, 0.4), 
      -1px 1px 0 rgba(255,255,255, 0.4), 
      1px 1px 0 rgba(255,255,255, 0.4), 
      0 -2px 8px, 
      0 0 2px, 
      0 0 5px #ff7e00, 
      0 0 15px #ff4444, 
      0 0 2px #ff7e00, 
      0 2px 3px #000;
  }
  20%, 21.9%, 63%, 63.9%, 65%, 69.9% {
    opacity: 0.4;
    text-shadow: none;
  }
`;

const FlickerText = styled(Typography)`
  font-family: "Fira Mono", monospace;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2ch;
  font-size: 5vw; 
  line-height: 1;
  color: #ffcc00;
  animation: ${flicker} 3s linear infinite;
  margin: 0 16px;
`;

const PokeballButton = styled(Button)`
  position: relative;
  padding: 15px 30px 15px 70px;
  font-size: 18px;
  font-weight: bold;
  color: #FF0000;
  background-color: transparent;
  border: 2px solid #FF0000;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }

  &:hover::before {
    width: 100%;
  }

  &:active::before {
    background-color: #333;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #FF0000;
    transition: width 0.3s ease;
    z-index: -1;
  }
`;

const Pokeball = styled('div')`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(to bottom, #EE1515 0%, #EE1515 48%, #000 48%, #000 52%, #fff 52%, #fff 100%);
  border-radius: 50%;
  border: 2px solid #000;
  box-shadow: inset -3px 3px 0 rgba(255, 255, 255, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid #000;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TransparentCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.5); 
  border: 2px dashed black;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 200px; 
  width: 200px; 
`;

const AddSign = styled(Typography)`
  font-size: 10rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  text-align: center; 
`;

const BattlePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showStats, setShowStats] = useState(true);
    const [selectedPokemon1, setSelectedPokemon1] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.post('https://pokegen.onrender.com/top_count');
                setPokemonList(response.data);
                console.log(response.data);
                setModalData(response.data[0]);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemonData();
    }, []);

    const handleCardClick = (pokemonKey) => {
        setCurrentPokemonIndex(pokemonKey);
        setModalData(pokemonList[pokemonKey]);
        setModalOpen(true);
    };

    const handleClose = () => setModalOpen(false);

    const toggleShowStats = () => {
        setShowStats(!showStats);
    };

    const handlePreviousPokemon = () => {
        const previousIndex = currentPokemonIndex === 0 ? pokemonList.length - 1 : currentPokemonIndex - 1;
        setCurrentPokemonIndex(previousIndex);
        setModalData(pokemonList[previousIndex]);
    };

    const handleNextPokemon = () => {
        const nextIndex = currentPokemonIndex === pokemonList.length - 1 ? 0 : currentPokemonIndex + 1;
        setCurrentPokemonIndex(nextIndex);
        setModalData(pokemonList[nextIndex]);
    };

    return (
        <Layout>
            <Container
                sx={{
                    backgroundImage: 'url("https://i.ibb.co/dkbB24f/Default-A-dramatic-nighttime-scene-of-a-volcanic-eruption-ragi-0-1.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    padding: 4,
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1
                    },
                    '& > *': {
                        position: 'relative',
                        zIndex: 2
                    }
                }}
            >

                <Box display="flex" justifyContent="center" alignItems="center">
                    <TransparentCard onClick={() => handleCardClick(0)} sx={{ margin: 2, padding: 2, cursor: 'pointer', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            {selectedPokemon1 ? (
                                <>
                                    <Typography variant="h5" align="center">{selectedPokemon1.Pokemon}</Typography>
                                    <Box display="flex" justifyContent="center">
                                        <img src={selectedPokemon1.image} alt={selectedPokemon1.Pokemon} style={{ width: '100%', borderRadius: 2 }} />
                                    </Box>
                                </>
                            ) : (
                                <AddSign>+</AddSign>
                            )}
                        </CardContent>
                    </TransparentCard>

                    <FlickerText>vs</FlickerText>

                    <TransparentCard onClick={() => handleCardClick(1)} sx={{ margin: 2, padding: 2, cursor: 'pointer', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            {selectedPokemon2 ? (
                                <>
                                    <Typography variant="h5" align="center">{selectedPokemon2.Pokemon}</Typography>
                                    <Box display="flex" justifyContent="center">
                                        <img src={selectedPokemon2.image} alt={selectedPokemon2.Pokemon} style={{ width: '60%', borderRadius: 2 }} />
                                    </Box>
                                </>
                            ) : (
                                <AddSign>+</AddSign>
                            )}
                        </CardContent>
                    </TransparentCard>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <PokeballButton>
                        <Pokeball />
                        Start Battle
                    </PokeballButton>
                </Box>
                <Modal open={modalOpen} onClose={handleClose}>
                    <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: '90%', maxWidth: 300, height: '59vh', bgcolor: '#FFD700', padding: 2, boxShadow: 24, borderRadius: 6, overflowY: 'auto' }}>
                        {modalData && (
                            <>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1} marginTop={0}>
                                    <IconButton onClick={handlePreviousPokemon}>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                    <img src={modalData.image} alt={modalData.Pokemon} style={{ padding: 0, width: '60%', height: '50%', borderRadius: 2 }} />
                                    <IconButton onClick={handleNextPokemon}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ padding: 0, marginBottom: 0, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="subtitle1" align="center" fontSize="1.25rem"><strong>{modalData.Pokemon}</strong></Typography>
                                    <IconButton aria-label="info" onClick={toggleShowStats} sx={{ color: (theme) => theme.palette.grey[700], marginLeft: 1 }}>
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                                {showStats ? (
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 0.5, marginBottom: 0.5, borderBottom: '1px solid #ddd' }}>
                                            <Box sx={{ flex: 1, paddingRight: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>HP:</strong> {modalData.HP}</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>Speed:</strong> {modalData.Speed}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 0.5, marginBottom: 0.5, borderBottom: '1px solid #ddd' }}>
                                            <Box sx={{ flex: 1, paddingRight: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>Attack:</strong> {modalData.Attack}</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>Defense:</strong> {modalData.Defense}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 0.5, marginBottom: 0.5, borderBottom: '1px solid #ddd' }}>
                                            <Box sx={{ flex: 1, paddingRight: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>Special Attack:</strong> {modalData["Special Attack"]}</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.90rem"><strong>Special Defense:</strong> {modalData["Special Defense"]}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box sx={{ padding: 0, marginBottom: 0, borderBottom: '1px solid #ddd' }}>
                                            <Typography variant="subtitle1" fontSize="0.75rem"><strong>Type:</strong> {modalData.Type.join(', ')}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 0, marginBottom: 0, borderBottom: '1px solid #ddd' }}>
                                            <Box sx={{ flex: 1, paddingRight: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.75rem"><strong>Height:</strong> {modalData.Height} m</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 1 }}>
                                                <Typography variant="subtitle1" fontSize="0.75rem"><strong>Weight:</strong> {modalData.Weight} kg</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ paddingRight: 1, marginBottom: 0, borderBottom: '1px solid #ddd' }}>
                                            <Typography variant="subtitle1" fontSize="0.75rem"><strong>Abilities:</strong></Typography>
                                            <ul style={{ marginTop: '0', marginBottom: '0' }}>
                                                {modalData.Abilities.map((ability, index) => (
                                                    <li key={index}><Typography variant="body1" fontSize="0.75rem">{ability}</Typography></li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                </Modal>
            </Container>
        </Layout>
    );
};

export default BattlePage;


/*  <svg viewBox="0 0 800 250">
                  <symbol id="s-text">
                      <text text-anchor="middle" x="50%" y="50%" dy=".35em">
                          Pokemon Battle
                      </text>
                  </symbol>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
              </svg>*/

// <img src={`data:image/png;base64,${selectedPokemon1.image}`} alt={selectedPokemon1.Pokemon} style={{ width: '100%', borderRadius: 2 }} />