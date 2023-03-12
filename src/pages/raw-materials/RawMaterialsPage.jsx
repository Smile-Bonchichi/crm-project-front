import React, { useEffect, useState } from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import axios from "../../app/rest";

const RawMaterialsPage = () => {
    const [rawMaterial, setRawMaterial] = useState({});
    const [rawMaterials, setRawMaterials] = useState([]);
    const [units, setUnits] = useState([]);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        axios.get(`/material`).then(res => {
            setRawMaterials(res);
            getAllUnit();
        });
    }

    const getAllUnit = () => {
        axios.get(`/dictionary/unit`).then(res => {
            setUnits(res)
        })
    }

    const addRawMaterial = () => {
        axios.post(`/material`, rawMaterial)
            .then(() => {
                getAll();
            })

        window.location.reload();
    }

    const editRawMaterial = () => {
        rawMaterial.id = editId;

        axios.post(`/material`, rawMaterial)
            .then(() => {
                getAll();
            })

        window.location.reload();
    }

    const deleteRawMaterial = (id) => {
        axios.delete(`/material?id=${ id }`)
            .then(() => {
                getAll();
            })
    }

    const onChangeName = (e) => {
        rawMaterial.name = e.target.value
        setRawMaterial(rawMaterial);
    }

    const onChangeUnit = (e) => {
        rawMaterial.unitId = e.target.value
        setRawMaterial(rawMaterial);
    }

    const onChangeAmount = (e) => {
        rawMaterial.amount = e.target.value
        setRawMaterial(rawMaterial);
    }

    const onChangeSum = (e) => {
        rawMaterial.sum = e.target.value
        setRawMaterial(rawMaterial);
    }

    return (
        <div>
            <Header text={ RouterUrl.RAW_MATERIALS_PAGE.name }/>

            <Button
                className={ 'add_button' }
                text={ '+' }
                onClick={ () => setOpenAdd(true) }
            />

            <table style={ {
                border: 'solid',
                width: '90vw'
            } }>
                <tr>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Имя
                    </th>

                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Unit
                    </th>

                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Amount
                    </th>

                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Sum
                    </th>
                </tr>
                {
                    rawMaterials.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.name }</span>
                                </td>
                                <td>
                                    <span>{ item.unitName }</span>
                                </td>
                                <td>
                                    <span>{ item.amount }</span>
                                </td>
                                <td>
                                    <span>{ item.sum }</span>
                                </td>
                                <td>
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Удалить' }
                                        onClick={ () => deleteRawMaterial(item.id) }
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
                                                        <input id='name' onChange={ onChangeName }
                                                               value={ rawMaterial.name } type="text"/>
                                                    </label>
                                                    <p>Единица измерения</p>
                                                    <select onChange={ onChangeUnit }>
                                                        {
                                                            units
                                                                .map((item, index) => {
                                                                    return <option selected value={ item.id }
                                                                                   key={ index }> { item.name } </option>
                                                                })
                                                        }
                                                    </select>
                                                    <label htmlFor="salary">
                                                        <p>Кол-во</p>
                                                        <input id='salary' onChange={ onChangeAmount }
                                                               value={ rawMaterial.salary } type="number"/>
                                                    </label>
                                                    <label htmlFor="address">
                                                        <p>Сумма</p>
                                                        <input id='address' onChange={ onChangeSum }
                                                               value={ rawMaterial.address }
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
                                                        onClick={ editRawMaterial }
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
                                <input id='name' onChange={ onChangeName }
                                       value={ rawMaterial.name } type="text"/>
                            </label>
                            <p>Единица измерения</p>
                            <select onChange={ onChangeUnit }>
                                {
                                    units
                                        .map((item, index) => {
                                            return <option selected value={ item.id }
                                                           key={ index }> { item.name } </option>
                                        })
                                }
                            </select>
                            <label htmlFor="salary">
                                <p>Кол-во</p>
                                <input id='salary' onChange={ onChangeAmount }
                                       value={ rawMaterial.salary } type="number"/>
                            </label>
                            <label htmlFor="address">
                                <p>Сумма</p>
                                <input id='address' onChange={ onChangeSum }
                                       value={ rawMaterial.address }
                                       type="text"/>
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
                                onClick={ addRawMaterial }
                            />
                        </div>
                    </>
                }
                onCLose={ () => setOpenAdd(false) }
            />
        </div>
    );
};

export default RawMaterialsPage;