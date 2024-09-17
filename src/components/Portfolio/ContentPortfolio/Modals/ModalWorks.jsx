import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useRef } from 'react';
import { MdDelete } from 'react-icons/md';

function ModalWorks({ showModalWorks, setShowModalWorks, data }) {
    const [works, setWorks] = useState(data);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const nameRef = useRef(null);
    const categoryRef = useRef(null);

    const handleDelete = async (id) => {
        try {
            const URL = import.meta.env.VITE_URL_API;
            const URL_DELETE = import.meta.env.VITE_API_DELETEWORK;
            const URL_Petition = URL + URL_DELETE;
            await axios.delete(URL_Petition, {
                data: {
                    uid: sessionStorage.getItem('uid'),
                    id: id
                }
            });
            setWorks(works.filter(work => work.NameProject !== id)); // Actualiza la lista
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        const name = nameRef.current.value;
        const category = categoryRef.current.value;

        try {
            const URL = import.meta.env.VITE_URL_API;
            const URL_PUT = import.meta.env.VITE_API_UPLOADPORTFOLIO;
            const URL_Petition = URL + URL_PUT;
            await axios.post(URL_Petition, {
                uid: sessionStorage.getItem('uid'),
                portfolio: [
                    {
                        nombre: name,
                        categoria: category,
                        imagen: category
                    }
                ]
            });

            setWorks([...works, { NameProject: name, Category: category }]);
            setShowModalAdd(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={showModalWorks} size='lg' onHide={() => setShowModalWorks(false)} centered>
                <Modal.Header>
                    <Modal.Title>Editar Trabajos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="w-100">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Nombre</th>
                                <th className="px-4 py-2 text-left">Categoría</th>
                                <th className="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map((work, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border-t">{work.NameProject}</td>
                                    <td className="px-4 py-2 border-t">{work.Category}</td>
                                    <td className="px-4 py-2 border-t">
                                        <Button
                                            onClick={() => handleDelete(work.NameProject)}
                                            className='d-flex align-items-center'
                                        >
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
                    <Button variant="outline-primary" onClick={() => setShowModalWorks(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setShowModalWorks(false);
                        setShowModalAdd(true);
                    }}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalAdd} size='lg' onHide={() => setShowModalAdd(false)} centered>
                <Modal.Header>
                    <Modal.Title>Agregar Trabajo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel className='mb-3' label="Nombre del Proyecto">
                        <Form.Control ref={nameRef} />
                    </FloatingLabel>

                    <FloatingLabel className='mb-3' controlId="floatingSelect" label="Categoría">
                        <Form.Select ref={categoryRef}>
                            <option value="Investigacion">Investigacion</option>
                            <option value="Publicacion">Publicacion</option>
                            <option value="Experimento">Experimento</option>
                        </Form.Select>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer className="d-flex w-100 justify-content-center gap-2">
                    <Button variant="outline-primary" onClick={() => {
                        setShowModalAdd(false);
                        setShowModalWorks(true);
                    }}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalWorks;
