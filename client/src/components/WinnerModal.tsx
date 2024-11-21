interface WinnerModalProps {
  winner: string | null;
  handleReset: () => void;
}

function WinnerModal({ winner, handleReset }: WinnerModalProps) {
  return (
    <div className="modal modal-open bg-white">
      <div className="modal-box">
        <h2 className="text-xl font-bold text-center">Player {winner} Wins!</h2>
        <p className="text-center text-lg mt-2">
          Congratulations! {winner} has claimed victory. Do you want to play
          again and test your skills?
        </p>
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal;
