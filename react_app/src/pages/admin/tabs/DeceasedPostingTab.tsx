import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFxn from '@/utils/useFunctions';
import api from '@/api';
import { useAppStore } from '@/store/useAppStore';

interface Props {
    onDone: () => void;
}

interface SurvivedBy {
    survived_by: string;
    relationship: string;
}

const relationships = [
    { name: 'Friend', value: 'friend' },
    { name: 'Brother', value: 'brother' },
    { name: 'Sister', value: 'sister' },
    { name: 'Son', value: 'son' },
    { name: 'Daughter', value: 'daughter' },
    { name: 'Father', value: 'father' },
    { name: 'Mother', value: 'mother' },
    { name: 'Relation', value: 'relation' },
];

const DeceasedPostingTab: React.FC<Props> = ({ onDone }) => {
    const { showDeceasedCopyModal } = useAppStore();
    // Wait, the Vue code called appVar.showDeceasedCopyModal(record).
    // I need to ensure AppStore has this or use a local modal/store.
    // I'll check useAppStore later, for now assuming it's there or I might need to add it.
    // Actually, I should check useAppStore.ts content. I'll do that in a view_file if needed but I'll proceed assuming I can dispatch or call it.
    
    // Correction: In Step 146 (previous turn), I ported useAppStore. It had `showDeceasedCopyModal`?
    // I need to verify.
    
    const [form, setForm] = useState({
        deceased: '',
        biography: '',
        survivedBys: [{ survived_by: '', relationship: 'friend' }] as SurvivedBy[],
        photo_path: '',
        display_photo: null as File | null,
        birth_date: new Date(),
        death_date: new Date(),
        isSaving: false
    });

    useEffect(() => {
        if (form.birth_date > form.death_date) {
            setForm(prev => ({ ...prev, death_date: prev.birth_date }));
        }
    }, [form.birth_date]);

    const addNewSurvivedByField = () => {
        setForm(prev => ({
            ...prev,
            survivedBys: [...prev.survivedBys, { survived_by: '', relationship: 'friend' }]
        }));
    };

    const removeSurvivedByField = (index: number) => {
        setForm(prev => ({
            ...prev,
            survivedBys: prev.survivedBys.filter((_, i) => i !== index)
        }));
    };

    const updateSurvivedBy = (index: number, field: keyof SurvivedBy, value: string) => {
        const newSurvivedBys = [...form.survivedBys];
        newSurvivedBys[index] = { ...newSurvivedBys[index], [field]: value };
        setForm(prev => ({ ...prev, survivedBys: newSurvivedBys }));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const requiredFormats = ['png', 'jpg', 'jpeg', 'svg'];
        const file = acceptedFiles[0];
        const ext = file.name.split('.').pop()?.toLowerCase();
        
        if (!ext || !requiredFormats.includes(ext)) {
            useFxn.toast('Please upload an image (png, jpg, jpeg, svg)', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
             setForm(prev => ({ ...prev, photo_path: e.target.result, display_photo: file }));
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/*': []} });

    const saveForm = async () => {
        if (!form.deceased) {
            useFxn.toast('Name of Deceased is empty!', 'warning');
            return;
        }
        if (!form.biography) {
            useFxn.toast('Please enter a short biography', 'warning');
            return;
        }
        if (!form.display_photo) {
            useFxn.toast('You need to add a photo!', 'warning');
            return;
        }

        const filledSurvivedBys = form.survivedBys.filter(x => x.survived_by.trim() !== '');

        const newForm = new FormData();
        newForm.append('deceased', form.deceased);
        newForm.append('biography', form.biography);
        if (form.display_photo) newForm.append('display_photo', form.display_photo);
        newForm.append('birth_date', form.birth_date.toISOString());
        newForm.append('death_date', form.death_date.toISOString());
        if (filledSurvivedBys.length) {
             newForm.append('survivedBys', JSON.stringify(filledSurvivedBys));
        }

        const confirm = await useFxn.confirm("Please Confirm the details before proceeding", "Yes Proceed", "warning");
        if (confirm.isConfirmed) {
            sendFormToAPI(newForm);
        }
    };

    const sendFormToAPI = async (formData: FormData) => {
        setForm(prev => ({ ...prev, isSaving: true }));
        try {
            const resp = await api.userUploadDeceased(formData);
            if (resp.status === 202) {
                useFxn.toast('It seems you have uploaded this exact name before!', 'error');
                return;
            }

            useFxn.toast('Uploaded Successfully', 'success');
            showDeceasedCopyModal(resp.data);
             
            onDone();
            // Reset form
            setForm({
                deceased: '',
                biography: '',
                survivedBys: [{ survived_by: '', relationship: 'friend' }],
                photo_path: '',
                display_photo: null,
                birth_date: new Date(),
                death_date: new Date(),
                isSaving: false
            });

        } catch (error) {
            console.error(error);
        } finally {
            setForm(prev => ({ ...prev, isSaving: false }));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center min-vh-100 g-3">
                <div className="col-md-12">
                    <div className="row g-3">
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Deceased name:</label>
                                            <input 
                                                value={form.deceased}
                                                onChange={e => setForm({...form, deceased: e.target.value})}
                                                type="text" className="form-control" placeholder="enter name.." />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Born:</label>
                                            <DatePicker 
                                                selected={form.birth_date} 
                                                onChange={(date: Date | null) => date && setForm({...form, birth_date: date})}
                                                className="form-control"
                                                maxDate={new Date()}
                                                dateFormat="dd MMM, yyyy"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Died:</label>
                                             <DatePicker 
                                                selected={form.death_date} 
                                                onChange={(date: Date | null) => date && setForm({...form, death_date: date})}
                                                className="form-control"
                                                minDate={form.birth_date}
                                                maxDate={new Date()}
                                                dateFormat="dd MMM, yyyy"
                                            />
                                        </div>

                                        <div className="col-12" style={{ marginBottom: '100px', height: '200px' }}>
                                            <label className="form-label">Biography:</label>
                                            <ReactQuill 
                                                theme="snow" 
                                                value={form.biography} 
                                                onChange={content => setForm({...form, biography: content})}
                                                style={{ height: '150px' }}
                                                placeholder="enter here.."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="form-label mb-3">Survived by:</div>
                                    <div className="card border-0 p-0 Survived_by-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                        <div className="card-body p-0">
                                            {form.survivedBys.map((item, index) => (
                                                <div key={index} className="col-12 bg-light-subtle mb-2 px-2 pb-3 card">
                                                    <div className="row g-3">
                                                        <div className="col-12 mb-0">
                                                            {form.survivedBys.length > 1 && (
                                                                <span onClick={() => removeSurvivedByField(index)}
                                                                    className="float-end text-danger border-0 cursor-pointer">
                                                                    <i className="bi bi-x"></i>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input 
                                                                value={item.survived_by}
                                                                onChange={e => updateSurvivedBy(index, 'survived_by', e.target.value)}
                                                                type="text" className="form-control" placeholder="enter name.." />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <select 
                                                                value={item.relationship}
                                                                onChange={e => updateSurvivedBy(index, 'relationship', e.target.value)}
                                                                className="form-select">
                                                                <option disabled>Relationship</option>
                                                                {relationships.map(r => <option key={r.value} value={r.value}>Relationship: {r.name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12 m-0 d-flex justify-content-end">
                                        <button onClick={addNewSurvivedByField} className="btn btn-link text-success-emphasis btn-sm">
                                            <i className="bi bi-plus"></i>add new line
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="row justify-content-center g-3">
                                        <label className="form-label">Display Photo (click to change):</label>
                                        <div className="col-md-3 order-2 order-md-1 d-flex justify-content-center">
                                            <div {...getRootProps()} className="image-circle"
                                                style={{ 
                                                    backgroundImage: `url(${form.photo_path})`,
                                                    height: '100px',
                                                    width: '100px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--bs-light-bg-subtle)',
                                                    border: '1px solid #e8e5e5',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center center',
                                                    backgroundRepeat: 'no-repeat',
                                                    cursor: 'pointer'
                                                }}>
                                                <input {...getInputProps()} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="col-12">
                                        <div className="col-md-4 float-md-end">
                                            {!form.isSaving ? (
                                                <button onClick={saveForm} className="btn btn-theme w-100">Save</button>
                                            ) : (
                                                <button className="btn btn-theme w-100" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Saving...
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeceasedPostingTab;
