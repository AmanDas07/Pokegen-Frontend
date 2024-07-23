import React, { useState } from 'react';
import { Container, Box, Typography, Card, CardContent, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';
import Layout from './Layout';

const pokemonData = {
    "Pokemon1": {
        "Abilities": ["Intimidate", "Flash Fire, Justified (hidden ability)"],
        "Attack": 110,
        "Attack Max": 350,
        "Attack Min": 202,
        "Defense": 80,
        "Defense Max": 284,
        "Defense Min": 148,
        "HP": 90,
        "HP Max": 384,
        "HP Min": 290,
        "Height": 1.9,
        "Pokemon": "Arcanine",
        "Simplified Type": "Fire",
        "Special Attack": 100,
        "Special Attack Max": 328,
        "Special Attack Min": 184,
        "Special Defense": 80,
        "Special Defense Max": 284,
        "Special Defense Min": 148,
        "Speed": 95,
        "Speed Max": 317,
        "Speed Min": 175,
        "Type": ["Fire"],
        "Weight": 155.0,
        "image": "https://svgshare.com/i/18XU.svg"
    },
    "Pokemon2": {
        "Abilities": ["Flash Fire, Weak Armor (hidden ability)"],
        "Attack": 60,
        "Attack Max": 240,
        "Attack Min": 112,
        "Defense": 100,
        "Defense Max": 328,
        "Defense Min": 184,
        "HP": 85,
        "HP Max": 374,
        "HP Min": 280,
        "Height": 1.5,
        "Pokemon": "Armarouge",
        "Simplified Type": "Fire",
        "Special Attack": 125,
        "Special Attack Max": 383,
        "Special Attack Min": 229,
        "Special Defense": 80,
        "Special Defense Max": 284,
        "Special Defense Min": 148,
        "Speed": 75,
        "Speed Max": 273,
        "Speed Min": 139,
        "Type": ["Fire", "Psychic"],
        "Weight": 85.0,
        "image": "https://img.pokemondb.net/artwork/large/armarouge.jpg"
    }
};

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
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2ch;
  font-size: 10vw;
  line-height: 1;
  color: #ffcc00;
  animation: ${flicker} 3s linear infinite;
  margin: 0 16px;
`;

const BattlePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showStats, setShowStats] = useState(true);
    const [selectedPokemon1, setSelectedPokemon1] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);

    const handleCardClick = (pokemonKey) => {
        setModalData(pokemonData[pokemonKey]);
        setModalOpen(true);
    };

    const handleClose = () => setModalOpen(false);

    const toggleShowStats = () => {
        setShowStats(!showStats);
    };

    const handleSelect = () => {
        if (modalData.Pokemon === 'Arcanine') {
            setSelectedPokemon1(modalData);
        } else {
            setSelectedPokemon2(modalData);
        }
        handleClose();
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
                <Typography variant="h4" align="center" gutterBottom>Pokémon Battle</Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Card onClick={() => handleCardClick('Pokemon1')} sx={{ margin: 2, padding: 2, cursor: 'pointer', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            {selectedPokemon1 ? (
                                <>
                                    <Typography variant="h5" align="center">{selectedPokemon1.Pokemon}</Typography>
                                    <Box display="flex" justifyContent="center">
                                        <img src={selectedPokemon1.image} alt={selectedPokemon1.Pokemon} style={{ width: '30%', borderRadius: 2 }} />
                                    </Box>
                                </>
                            ) : (
                                <Typography variant="h5" align="center">Select Pokémon 1</Typography>
                            )}
                        </CardContent>
                    </Card>

                    <FlickerText>VS</FlickerText>

                    <Card onClick={() => handleCardClick('Pokemon2')} sx={{ margin: 2, padding: 2, cursor: 'pointer', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            {selectedPokemon2 ? (
                                <>
                                    <Typography variant="h5" align="center">{selectedPokemon2.Pokemon}</Typography>
                                    <Box display="flex" justifyContent="center">
                                        <img src={selectedPokemon2.image} alt={selectedPokemon2.Pokemon} style={{ width: '30%', borderRadius: 2 }} />
                                    </Box>
                                </>
                            ) : (
                                <Typography variant="h5" align="center">Select Pokémon 2</Typography>
                            )}
                        </CardContent>
                    </Card>
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
                                <Box display="flex" justifyContent="center" alignItems="center" marginBottom={1} marginTop={0}>
                                    <img src={modalData.image} alt={modalData.Pokemon} style={{ padding: 0, width: '60%', height: '60%', borderRadius: 2 }} />
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
                                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 1.5, fontSize: '0.75rem', borderRadius: '16px', padding: '6px 12px' }} onClick={handleSelect}>Select</Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </Container>
        </Layout>
    );
};

export default BattlePage;
