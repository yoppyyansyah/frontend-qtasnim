import React from 'react';

const ConfirmationDialog = ({ showConfirmation, handleConfirm, handleClose }) => {
  return (
    <div className={`modal ${showConfirmation ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showConfirmation ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Konfirmasi</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Apakah anda yakin ingin menghapus data ini?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
