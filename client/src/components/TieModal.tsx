interface TieModalProps {
  handleReset: () => void;
}

function TieModal({ handleReset }: TieModalProps) {
  return (
    <div className="modal modal-open bg-white">
      <div className="modal-box">
        <h2 className="text-xl font-bold text-center">It's a Tie!</h2>
        <p className="text-center text-lg mt-2">
          No one wins this time. The game ended in a tie! Want to try again and
          break the tie?
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

export default TieModal;
