import { useRecoilValue } from 'recoil';
import { spinnerState } from '../../store';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  const spinner = useRecoilValue(spinnerState);
  return (
    <>
      {spinner && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 100,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
