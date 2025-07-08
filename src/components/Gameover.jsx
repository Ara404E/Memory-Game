import { Modal, Box, Typography } from "@mui/material"
const Gameover = ({score}) => {
 return (
        <Modal
        open
        sx={{
            display:"flex",
            p:1,
            alignItems:"center",
            justifyContent:"center"
        }}
        >
            <Box
            sx={(theme) => ({
                position: 'relative',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                p: 4
            })}>
                <Typography sx={{ pt: 2 }}>
                    Your score was {score}
                </Typography>
            </Box>
        </Modal>
    )}


export default Gameover