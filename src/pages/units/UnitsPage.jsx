import React, { useEffect, useState } from 'react';
import { RouterUrl } from "../../app/router/Routers";
import axios from '../../app/rest/index'
import Header from "../../ui/header/Header";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import Dictionary from "../../ui/dictionary/Dictionary";
import "./units.css";

import '../../ui/dictionary/dictionary.css';

const UnitsPage = () => {
        const [unit, setUnit] = useState({});
        const [units, setUnits] = useState([]);

        const [openAdd, setOpenAdd] = useState(false);
        const [openEdit, setOpenEdit] = useState(false);
        const [editId, setEditId] = useState(0);

        useEffect(() => {
            getAll();
        }, []);

        const getAll = () => {
            axios.get(`/dictionary/unit`).then(res => {
                setUnits(res)
            });
        }

        const addUnit = () => {
            axios.post(`/dictionary/unit?name=${ unit.name }`)
                .then(() => {
                    getAll();
                })
        }

        const editUnit = () => {
            axios.post(`/dictionary/unit?id=${ editId }&name=${ unit.name }`)
                .then(() => {
                    getAll();
                })
        }

        const deleteUnit = (id) => {
            axios.delete(`/dictionary/unit?id=${ id }`)
                .then(() => {
                    getAll();
                })
        }

        const onChange = (e) => {
            setUnit({ name: e.target.value });
        }

        return (
            <div>
                <Header text={ RouterUrl.UNITS_PAGE.name }/>

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
                    <tr>
                        <th style={ {
                            border: 'thick double #32a1ce'
                        } }>
                            Наименование
                        </th>
                    </tr>
                    {
                        units.map((item, index) => {
                            return (
                                <tr key={ index }>
                                    <td>
                                        <Dictionary name={ item.name }/>
                                    </td>
                                    <td>
                                        <Button
                                            className={ 'close-button' }
                                            text={ 'Delete' }
                                            onClick={ () => deleteUnit(item.id) }
                                        />
                                        <Button
                                            className={ 'close-button' }
                                            text={ 'Alter' }
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
                                                            <input id='name' onChange={ onChange } value={ unit.name }
                                                                   type="text"/>
                                                        </label>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                            className={ 'secondary-button' }
                                                            text={ 'Close' }
                                                            onClick={ () => setOpenEdit(false) }
                                                        />

                                                        <Button
                                                            className={ 'primary-button' }
                                                            text={ 'Save' }
                                                            onClick={ editUnit }
                                                        />
                                                    </div>
                                                </>
                                            }
                                            onCLose={ () => setOpenEdit(false) }
                                        />
                                    </td>
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
                                    <input id='name' onChange={ onChange } value={ unit.name } type="text"/>
                                </label>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className={ 'secondary-button' }
                                    text={ 'Close' }
                                    onClick={ () => setOpenAdd(false) }
                                />

                                <Button
                                    className={ 'primary-button' }
                                    text={ 'Save' }
                                    onClick={ addUnit }
                                />
                            </div>
                        </>
                    }
                    onCLose={ () => setOpenAdd(false) }
                />
            </div>
        );
    }
;

export default UnitsPage;
