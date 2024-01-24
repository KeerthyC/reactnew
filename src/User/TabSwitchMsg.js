
const CustomModal = ({ isOpen, onClose, count }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content1">
          <h2>Attention</h2>
          <p>Tab switching ({count} instance) is tracked and forbidden during the exam. Continuing may result in disqualification.</p>
          <button onClick={onClose}>Understood</button>
        </div>
      </div>
    );
  };
  
  export default CustomModal;
