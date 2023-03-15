import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import axios from '../../app/rest/index.js';
import Button from '../../ui/button/Button.jsx';
import Modal from '../../ui/modal/Modal.jsx';

const FinishedProductionPage = () => {
    const [finishedProduct, setFinishedProduct] = useState({});
    const [finishedProducts, setFinishedProducts] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [units, setUnits] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/product/finished`).then(res => {
            setFinishedProducts(res);
            
            axios.get(`/ingredient`).then(res => {
                setIngredients(res);
            });
            axios.get(`/dictionary/unit`).then(res => {
                setUnits(res);
            });
        });
    };
    
    const addFinishedProduct = () => {
        axios.post(`/product/finished`, finishedProduct).then(() => {
            getAll();
        });
    };
    
    const editFinishedProduct = () => {
        axios.post(`/product/finished`, finishedProduct).then(() => {
            getAll();
        });
    };
    
    const deleteFinishedProduct = (id) => {
        axios.delete(`/product/finished?id=${ id }`).then(() => {
            getAll();
        });
    };
    
    const onChangeName = (e) => {
        finishedProduct.name = e.target.value;
        setFinishedProduct(finishedProduct);
    };
    
    const onChangeUnit = (e) => {
        finishedProduct.unitId = e.target.value;
        setFinishedProduct(finishedProduct);
    };
    
    const onChangeIngredient = (e) => {
        finishedProduct.ingredientId = e.target.value;
        setFinishedProduct(finishedProduct);
    };
    
    const onChangeCount = (e) => {
        finishedProduct.count = e.target.value;
        setFinishedProduct(finishedProduct);
    };
    
    const onChangeAmount = (e) => {
        finishedProduct.amount = e.target.value;
        setFinishedProduct(finishedProduct);
    };
    
    return (
        <div>
            <Header text={ RouterUrl.FINISHED_PRODUCTION_PAGE.name }/>
            
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
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Unit name
                    </th>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Ingredient name
                    </th>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Кол-во
                    </th>
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Сумма
                    </th>
                </tr>
                {
                    finishedProducts.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.name }</span>
                                </td>
                                <td>
                                    <span>{ item.unitName }</span>
                                </td>
                                <td>
                                    <span>{ item.ingredientName }</span>
                                </td>
                                <td>
                                    <span>{ item.count }</span>
                                </td>
                                <td>
                                    <span>{ item.amount }</span>
                                </td>
                                <td>
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Delete' }
                                        onClick={ () => deleteFinishedProduct(
                                            item.id) }
                                    />
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Alter' }
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
                                                    <label htmlFor='salary'>
                                                        <p>Наименование</p>
                                                        <input id='salary'
                                                               onChange={ onChangeName }
                                                               value={ ingredients.name }
                                                               type='text'/>
                                                    </label>
                                                    <p>Unit</p>
                                                    <select
                                                        onChange={ onChangeUnit }>
                                                        {
                                                            units.map(
                                                                (
                                                                    item,
                                                                    index) => {
                                                                    return <option
                                                                        selected
                                                                        value={ item.id }
                                                                        key={ index }> { item.name } </option>;
                                                                })
                                                        }
                                                    </select>
                                                    <p>ИНгредиет</p>
                                                    <select
                                                        onChange={ onChangeIngredient }>
                                                        {
                                                            ingredients.map(
                                                                (
                                                                    item,
                                                                    index) => {
                                                                    return <option
                                                                        selected
                                                                        value={ item.id }
                                                                        key={ index }> { item.rawMaterialName } </option>;
                                                                })
                                                        }
                                                    </select>
                                                    <label htmlFor='salary'>
                                                        <p>Кол-во</p>
                                                        <input id='salary'
                                                               onChange={ onChangeCount }
                                                               value={ ingredients.count }
                                                               type='number'/>
                                                    </label>
                                                    <label htmlFor='salary'>
                                                        <p>Стоимость</p>
                                                        <input id='salary'
                                                               onChange={ onChangeAmount }
                                                               value={ ingredients.amount }
                                                               type='number'/>
                                                    </label>
                                                </div>
                                                <div
                                                    className='modal-footer'>
                                                    <Button
                                                        className={ 'secondary-button' }
                                                        text={ 'Close' }
                                                        onClick={ () => setOpenEdit(
                                                            false) }
                                                    />
                                                    
                                                    <Button
                                                        className={ 'primary-button' }
                                                        text={ 'Save' }
                                                        onClick={ editFinishedProduct }
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
                            <label htmlFor='salary'>
                                <p>Наименование</p>
                                <input id='salary'
                                       onChange={ onChangeName }
                                       value={ ingredients.name }
                                       type='text'/>
                            </label>
                            <p>Unit</p>
                            <select
                                onChange={ onChangeUnit }>
                                {
                                    units.map(
                                        (
                                            item,
                                            index) => {
                                            return <option
                                                selected
                                                value={ item.id }
                                                key={ index }> { item.name } </option>;
                                        })
                                }
                            </select>
                            <p>ИНгредиет</p>
                            <select
                                onChange={ onChangeIngredient }>
                                {
                                    ingredients.map((item, index) => {
                                        return <option
                                            selected
                                            value={ item.id }
                                            key={ index }> { item.rawMaterialName } </option>;
                                    })
                                }
                            </select>
                            <label htmlFor='salary'>
                                <p>Кол-во</p>
                                <input id='salary'
                                       onChange={ onChangeCount }
                                       value={ ingredients.count }
                                       type='number'/>
                            </label>
                            <label htmlFor='salary'>
                                <p>Стоимость</p>
                                <input id='salary'
                                       onChange={ onChangeAmount }
                                       value={ ingredients.amount }
                                       type='number'/>
                            </label>
                        </div>
                        <div className='modal-footer'>
                            <Button
                                className={ 'secondary-button' }
                                text={ 'Close' }
                                onClick={ () => setOpenAdd(false) }
                            />
                            
                            <Button
                                className={ 'primary-button' }
                                text={ 'Save' }
                                onClick={ addFinishedProduct }
                            />
                        </div>
                    </>
                }
                onCLose={ () => setOpenAdd(false) }
            />
        </div>
    );
};

export default FinishedProductionPage;
