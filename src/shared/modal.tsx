export default function Modal({modalId, title, onConfirm}:any) {
  return (
    <div className="modal fade" ref={modalId} data-bs-backdrop="true" data-bs-keyboard="false" aria-labelledby={`${modalId}Label`} aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onConfirm} className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
            <button type="button" data-bs-dismiss="modal" className="btn btn-secoundary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
