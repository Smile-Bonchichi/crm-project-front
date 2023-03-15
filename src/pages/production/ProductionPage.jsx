import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import Filter from '../../ui/filter/Filter';
import Button from '../../ui/button/Button.jsx';
import Modal from '../../ui/modal/Modal.jsx';
import axios from '../../app/rest/index.js';

const ProductionPage = () => {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    
    const [finishedProducts, setFinishedProducts] = useState([]);
    const [employees, setEmployees] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/product`).then(res => {
            setProducts(res);
            
            axios.get(`/product/finished`).then(res => {
                setFinishedProducts(res);
            });
            
            console.log(finishedProducts);
            
            axios.get(`/user`).then(res => {
                setEmployees(res);
            });
        });
    };
    
    const deletePurchase = (id) => {
        axios.delete(`/product?id=${ id }`).then(() => {
            getAll();
        });
    };
    
    const addIngredient = () => {
        axios.post(`/product`, product).then(() => {
            getAll();
        });
    };
    
    const getByDate = () => {
        axios.get(
            `/product/get-by-date?dateFrom=${ dateFrom +
            'T00:00:00' }&dateTo=${ dateTo + 'T23:59:59' }`
        ).then(res => {
            setProducts(res);
        });
    };
    
    const onChangeRawMaterial = (e) => {
        product.finishedProductId = e.target.value;
        setProduct(product);
    };
    
    const onChangeCount = (e) => {
        product.count = e.target.value;
        setProduct(product);
    };
    
    const onChangeEmployee = (e) => {
        product.employeeId = e.target.value;
        setProduct(product);
    };
    
    return (
        <div>
            <Header text={ RouterUrl.PRODUCTION_PAGE.name }/>
            
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
                    products.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.finishedProductName }</span>
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
                                        onClick={ () => deletePurchase(item.id) }
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
                                <p>Кол-во</p>
                                <input id='salary'
                                       onChange={ onChangeCount }
                                       value={ product.count }
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

export default ProductionPage;