import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAppStore } from '@/store/useAppStore';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import { useNavigate } from 'react-router-dom';

const CondoModal = ({ onHasPosted }: { onHasPosted: () => void }) => {
    const { condoModal, toggleCondoModal, currentDeceasedId, appName } = useAppStore();
    const [form, setForm] = useState({
        condolence: '',
        condo_name: '',
        relationship: '',
        isSaving: false,
        condoIsEmpty: false
    });
    const navigate = useNavigate();
    const maxCharCount = 250;

    const handleClose = () => {
        if (condoModal) toggleCondoModal();
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let val = e.target.value;
        if (val.length > maxCharCount) val = val.slice(0, maxCharCount);
        setForm({ ...form, condolence: val });
    };

    const postCondolence = async () => {
        setForm(prev => ({ ...prev, condoIsEmpty: false }));
        if (!form.condolence) {
            setForm(prev => ({ ...prev, condoIsEmpty: true }));
            return;
        }

        const obj = {
            condolence: form.condolence,
            condo_name: !form.condo_name ? 'anonymous' : form.condo_name,
            relationship: !form.relationship ? null : form.relationship,
            deceased_id: currentDeceasedId
        };

        const confirm = await useFxn.confirm('Post now', 'Confirm');
        if (confirm.isConfirmed) {
            setForm(prev => ({ ...prev, isSaving: true }));
            try {
                const resp = await api.postCondolence(obj);
                if (resp.status === 201) {
                    onHasPosted();
                    useFxn.toast('Condolence posted successfully', 'success');
                    setForm({ ...form, condo_name: '', condolence: '', condoIsEmpty: false, isSaving: false });
                    handleClose();
                }
            } catch (error) {
                useFxn.toast('Sorry, this link is Expired!', 'warning');
                navigate('/');
                handleClose();
            } finally {
                setForm(prev => ({ ...prev, isSaving: false }));
            }
        }
    };

    return (
        <Modal show={condoModal} onHide={handleClose} centered backdrop="static" keyboard={false}>
            <div className="modal-header p-3 bg-theme border-0">
                <h5 className="modal-title w-100 text-white fw-bold text-center">{appName}.</h5>
            </div>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Your Name (optional)</label>
                    <input 
                        value={form.condo_name} 
                        onChange={e => setForm({...form, condo_name: e.target.value})}
                        type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <div className="mb-3">
                        <label className="form-label">Relationship</label>
                        <select 
                            value={form.relationship} 
                            onChange={e => setForm({...form, relationship: e.target.value})}
                            className="form-select">
                            <option value="" disabled>Select relationship</option>
                            <option value="sister">Sister</option>
                            <option value="brother">Brother</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="cousin">Cousin</option>
                            <option value="friend">Friend</option>
                            <option value="grand_child">Grand child</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="form-label">Write your condolence</label>
                    <textarea 
                        value={form.condolence} 
                        onChange={handleInput} 
                        placeholder="enter text here..." className="form-control" rows={5}></textarea>
                    <span className="small">{maxCharCount - form.condolence.length} characters remaining</span>
                    {form.condoIsEmpty && <span className="ms-2 small text-danger">field is empty!</span>}
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="link" onClick={handleClose} className="text-decoration-none text-secondary">
                    Cancel
                </Button>
                {!form.isSaving ? (
                    <Button onClick={postCondolence} style={{ width: '160px' }} className="btn-theme">
                        Post Condolence
                    </Button>
                ) : (
                    <Button style={{ width: '160px' }} disabled className="btn-theme">
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Posting...
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CondoModal;
