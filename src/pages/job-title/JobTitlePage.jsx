import React, { useEffect, useState } from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import Button from "../../ui/button/Button";
import axios from "../../app/rest";
import Dictionary from "../../ui/dictionary/Dictionary";
import Modal from "../../ui/modal/Modal";

const JobTitlePage = () => {
    const [jobTitle, setJobTitle] = useState({});
    const [jobTitles, setJobTitles] = useState([]);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        axios.get(`/dictionary/job-title`).then(res => {
            setJobTitles(res)
        });
    }

    const addJobTitle = () => {
        axios.post(`/dictionary/job-title?name=${ jobTitle.name }`)
            .then(() => {
                getAll();
            })
    }

    const editJobTitle = () => {
        axios.post(`/dictionary/job-title?id=${ editId }&name=${ jobTitle.name }`)
            .then(() => {
                getAll();
            })
    }

    const deleteJobTitle = (id) => {
        axios.delete(`/dictionary/job-title?id=${ id }`)
            .then(() => {
                getAll();
            })
    }

    const onChange = (e) => {
        setJobTitle({ name: e.target.value });

        e.target.value = '';
    }

    return (
        <div>
            <Header text={ RouterUrl.JOB_TITLE_PAGE.name }/>

            <Button
                className={ 'add_button' }
                text={ '+' }
                onClick={ () => setOpenAdd(true) }
            />

            <table style={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 'solid',
                width: '90vw'
            } }>
                <th style={ {
                    border: 'thick double #32a1ce'
                } }>
                    Наименование
                </th>
                {
                    jobTitles.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <Dictionary name={ item.name }/>

                                <Button
                                    className={ 'close-button' }
                                    text={ 'Удалить' }
                                    onClick={ () => deleteJobTitle(item.id) }
                                />
                                <Button
                                    className={ 'close-button' }
                                    text={ 'Изменить' }
                                    onClick={ () => {
                                        setOpenEdit(true);
                                        setEditId(item.id)
                                    } }
                                />
                                <Modal
                                    open={ openEdit }
                                    child={
                                        <>
                                            <div className="modal-desc">
                                                <label htmlFor="name">
                                                    <p>Название</p>
                                                    <input id='name' onChange={ onChange } value={ jobTitle.name }
                                                           type="text"/>
                                                </label>
                                            </div>
                                            <div className="modal-footer">
                                                <Button
                                                    className={ 'secondary-button' }
                                                    text={ 'Закрыть' }
                                                    onClick={ () => setOpenEdit(false) }
                                                />

                                                <Button
                                                    className={ 'primary-button' }
                                                    text={ 'Сохранить' }
                                                    onClick={ editJobTitle }
                                                />
                                            </div>
                                        </>
                                    }
                                    onCLose={ () => setOpenEdit(false) }
                                />
                            </tr>
                        );
                    })
                }
            </table>

            <Modal
                open={ openAdd }
                child={
                    <>
                        <div className="modal-desc">
                            <label htmlFor="name">
                                <p>Название</p>
                                <input id='name' onChange={ onChange } value={ jobTitle.name } type="text"/>
                            </label>
                        </div>
                        <div className="modal-footer">
                            <Button
                                className={ 'secondary-button' }
                                text={ 'Закрыть' }
                                onClick={ () => setOpenAdd(false) }
                            />

                            <Button
                                className={ 'primary-button' }
                                text={ 'Сохранить' }
                                onClick={ addJobTitle }
                            />
                        </div>
                    </>
                }
                onCLose={ () => setOpenAdd(false) }
            />
        </div>
    );
};

export default JobTitlePage;