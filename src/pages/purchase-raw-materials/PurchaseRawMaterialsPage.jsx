import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import Filter from '../../ui/filter/Filter';
import axios from '../../app/rest/index.js';
import Button from '../../ui/button/Button.jsx';
import Modal from '../../ui/modal/Modal.jsx';

const PurchaseRawMaterialsPage = () => {
    const [purchaseRawMaterial, setPurchaseRawMaterial] = useState({});
    const [purchaseRawMaterials, setPurchaseRawMaterials] = useState([]);
    
    const [employees, setEmployees] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);
    
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/material/purchase`).then(res => {
            setPurchaseRawMaterials(res);
            
            getAllRawMaterials();
            getAllEmployees();
        });
    };
    
    const getAllRawMaterials = () => {
        axios.get(`/material/raw`).then(res => {
            setRawMaterials(res);
        });
    };
    
    const getAllEmployees = () => {
        axios.get(`/user`).then(res => {
            setEmployees(res);
        });
    };
    
    const deletePurchase = (id) => {
        axios.delete(`/material/purchase?id=${ id }`).then(() => {
            getAll();
        });
    };
    
    const addIngredient = () => {
        axios.post(`/material/purchase`, purchaseRawMaterial).then(() => {
            getAll();
        });
        
        window.location.reload();
    };
    
    const editPurchase = () => {
        purchaseRawMaterial.id = editId;
        
        axios.post(`/material/purchase`, purchaseRawMaterial).then(() => {
            getAll();
        });
        
        window.location.reload();
    };
    
    const getByDate = () => {
        axios.get(
            `/material/purchase/get-by-date?dateFrom=${ dateFrom +
            'T00:00:00' }&dateTo=${ dateTo + 'T23:59:59' }`
        ).then(res => {
            setPurchaseRawMaterials(res);
        });
    };
    
    const onChangeRawMaterial = (e) => {
        purchaseRawMaterial.rawMaterialId = e.target.value;
        setPurchaseRawMaterial(purchaseRawMaterial);
    };
    
    const onChangeAmount = (e) => {
        purchaseRawMaterial.amount = e.target.value;
        setPurchaseRawMaterial(purchaseRawMaterial);
    };
    
    const onChangeCount = (e) => {
        purchaseRawMaterial.count = e.target.value;
        setPurchaseRawMaterial(purchaseRawMaterial);
    };
    
    const onChangeEmployee = (e) => {
        purchaseRawMaterial.employeeId = e.target.value;
        setPurchaseRawMaterial(purchaseRawMaterial);
    };
    
    return (
        <div>
            <Header text={ RouterUrl.PURCHASE_RAW_MATERIALS_PAGE.name }/>
            
            <Filter
                findBy={ getByDate }
                changeDateFrom={ setDateFrom }
                changeDateTo={ setDateTo }
            />
            
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
                        Название rawMaterial
                    </th>
                    
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Сумма
                    </th>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Кол-во
                    </th>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Соотрудник
                    </th>
                </tr>
                {
                    purchaseRawMaterials.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.rawMaterialName }</span>
                                </td>
                                <td>
                                    <span>{ item.amount }</span>
                                </td>
                                <td>
                                    <span>{ item.count }</span>
                                </td>
                                <td>
                                    <span>{ item.employeeName }</span>
                                </td>
                                <td>
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Удалить' }
                                        onClick={ () => deletePurchase(
                                            item.id) }
                                    />
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Изменить' }
                                        onClick={ () => {
                                            setOpenEdit(true);
                                            setEditId(item.id);
                                        } }
                                    />
                                    <Modal
                                        open={ openEdit }
                                        child={
                                            <>
                                                <div className='modal-desc'>
                                                    <p>Единица измерения</p>
                                                    <select
                                                        onChange={ onChangeRawMaterial }>
                                                        {
                                                            rawMaterials.map((
                                                                item,
                                                                index) => {
                                                                return <option
                                                                    selected
                                                                    value={ item.id }
                                                                    key={ index }> { item.name } </option>;
                                                            })
                                                        }
                                                    </select>
                                                    <label htmlFor='salary'>
                                                        <p>Сумма</p>
                                                        <input id='salary'
                                                               onChange={ onChangeAmount }
                                                               value={ purchaseRawMaterial.amount }
                                                               type='number'/>
                                                    </label>
                                                    <label htmlFor='salary'>
                                                        <p>Кол-во</p>
                                                        <input id='salary'
                                                               onChange={ onChangeCount }
                                                               value={ purchaseRawMaterial.count }
                                                               type='number'/>
                                                    </label>
                                                    <p>Соотрудник</p>
                                                    <select
                                                        onChange={ onChangeEmployee }>
                                                        {
                                                            employees.map((
                                                                item,
                                                                index) => {
                                                                return <option
                                                                    selected
                                                                    value={ item.id }
                                                                    key={ index }> { item.name } </option>;
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className='modal-footer'>
                                                    <Button
                                                        className={ 'secondary-button' }
                                                        text={ 'Закрыть' }
                                                        onClick={ () => setOpenEdit(
                                                            false) }
                                                    />
                                                    
                                                    <Button
                                                        className={ 'primary-button' }
                                                        text={ 'Сохранить' }
                                                        onClick={ editPurchase }
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
                        <div className='modal-desc'>
                            <p>Единица измерения</p>
                            <select
                                onChange={ onChangeRawMaterial }>
                                {
                                    rawMaterials.map((
                                        item,
                                        index) => {
                                        return <option
                                            selected
                                            value={ item.id }
                                            key={ index }> { item.name } </option>;
                                    })
                                }
                            </select>
                            <label htmlFor='salary'>
                                <p>Сумма</p>
                                <input id='salary'
                                       onChange={ onChangeAmount }
                                       value={ purchaseRawMaterial.amount }
                                       type='number'/>
                            </label>
                            <label htmlFor='salary'>
                                <p>Кол-во</p>
                                <input id='salary'
                                       onChange={ onChangeCount }
                                       value={ purchaseRawMaterial.count }
                                       type='number'/>
                            </label>
                            <p>Соотрудник</p>
                            <select
                                onChange={ onChangeEmployee }>
                                {
                                    employees.map((
                                        item,
                                        index) => {
                                        return <option
                                            selected
                                            value={ item.id }
                                            key={ index }> { item.name } </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className='modal-footer'>
                            <Button
                                className={ 'secondary-button' }
                                text={ 'Закрыть' }
                                onClick={ () => setOpenAdd(false) }
                            />
                            
                            <Button
                                className={ 'primary-button' }
                                text={ 'Сохранить' }
                                onClick={ addIngredient }
                            />
                        </div>
                    </>
                }
                onCLose={ () => setOpenAdd(false) }
            />
        </div>
    );
};

export default PurchaseRawMaterialsPage;