import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import Filter from '../../ui/filter/Filter';
import Button from '../../ui/button/Button.jsx';
import Modal from '../../ui/modal/Modal.jsx';
import axios from '../../app/rest/index.js';

const SaleOfProductsPage = () => {
    const [saleOfProduct, setSaleOfProduct] = useState({});
    const [saleOfProducts, setSaleOfProducts] = useState([]);
    
    const [finishedProducts, setFinishedProducts] = useState([]);
    const [employees, setEmployees] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);
    
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/product/sold`).then(res => {
            setSaleOfProducts(res);
            
            axios.get(`/product/finished`).then(res => {
                setFinishedProducts(res);
            });
            
            axios.get(`/user`).then(res => {
                setEmployees(res);
            });
        });
    };
    
    const getByDate = () => {
        axios.get(
            `/product/sold/get-by-date?dateFrom=${ dateFrom +
            'T00:00:00' }&dateTo=${ dateTo + 'T23:59:59' }`
        ).then(res => {
            setSaleOfProducts(res);
        });
    };
    
    const deletePurchase = (id) => {
        axios.delete(`/product/sold?id=${ id }`).then(() => {
            getAll();
        });
    };
    
    const addIngredient = () => {
        axios.post(`/product/sold`, saleOfProduct).then(() => {
            getAll();
        });
    };
    
    const editPurchase = () => {
        saleOfProduct.id = editId;
        
        axios.post(`/product/sold`, saleOfProduct).then(() => {
            getAll();
        });
        
        window.location.reload();
    };
    
    const onChangeRawMaterial = (e) => {
        saleOfProduct.finishedProductId = e.target.value;
        setSaleOfProduct(saleOfProduct);
    };
    
    const onChangeAmount = (e) => {
        saleOfProduct.amount = e.target.value;
        setSaleOfProduct(saleOfProduct);
    };
    
    const onChangeCount = (e) => {
        saleOfProduct.count = e.target.value;
        setSaleOfProduct(saleOfProduct);
    };
    
    const onChangeEmployee = (e) => {
        saleOfProduct.employeeId = e.target.value;
        setSaleOfProduct(saleOfProduct);
    };
    
    return (
        <div>
            <Header text={ RouterUrl.SALE_OF_PRODUCTS_PAGE.name }/>
            
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
                        Название продукции
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
                    <th style={ {
                        border: 'thick double #32a1ce'
                    } }>
                        Соотрудник
                    </th>
                </tr>
                {
                    saleOfProducts.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.finishedProductName }</span>
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
                                                    <p>Продукт</p>
                                                    <select
                                                        onChange={ onChangeRawMaterial }>
                                                        {
                                                            finishedProducts.map((
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
                                                               value={ saleOfProduct.amount }
                                                               type='number'/>
                                                    </label>
                                                    <label htmlFor='salary'>
                                                        <p>Кол-во</p>
                                                        <input id='salary'
                                                               onChange={ onChangeCount }
                                                               value={ saleOfProduct.count }
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
                            <p>Продукт</p>
                            <select
                                onChange={ onChangeRawMaterial }>
                                {
                                    finishedProducts.map((item, index) => {
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
                                       value={ saleOfProduct.amount }
                                       type='number'/>
                            </label>
                            <label htmlFor='salary'>
                                <p>Кол-во</p>
                                <input id='salary'
                                       onChange={ onChangeCount }
                                       value={ saleOfProduct.count }
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

export default SaleOfProductsPage;