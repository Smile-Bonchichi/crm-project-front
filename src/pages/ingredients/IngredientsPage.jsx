import React, { useEffect, useState } from 'react';
import Header from '../../ui/header/Header';
import { RouterUrl } from '../../app/router/Routers';
import Button from '../../ui/button/Button.jsx';
import Modal from '../../ui/modal/Modal.jsx';
import axios from '../../app/rest/index.js';

const IngredientsPage = () => {
    const [ingredient, setIngredient] = useState({});
    const [ingredients, setIngredients] = useState([]);
    
    const [rawMaterials, setRawMaterials] = useState([]);
    
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState(0);
    
    useEffect(() => {
        getAll();
    }, []);
    
    const getAll = () => {
        axios.get(`/ingredient`).then(res => {
            setIngredients(res);
            
            getAllRawMaterials();
        });
    };
    
    const getAllRawMaterials = () => {
        axios.get(`/material/raw`).then(res => {
            setRawMaterials(res);
        });
    };
    
    const addIngredient = () => {
        axios.post(
            `/ingredient?rawMaterialId=${ +ingredient.rawMaterialId }&count=${ ingredient.count }`
        ).then(() => {
            getAll();
        });
        
        window.location.reload();
    };
    
    const editIngredient = () => {
        ingredient.id = editId;

        axios.post(
            `/ingredient?id=${ +ingredient.id }&rawMaterialId=${ +ingredient.rawMaterialId }&count=${ ingredient.count }`
        ).then(() => {
            getAll();
        });

        window.location.reload();
    };
    
    const deleteIngredient = (id) => {
        axios.delete(`/ingredient?id=${ id }`).then(() => {
            getAll();
        });
    };

    const onChangeRawMaterial = (e) => {
        ingredient.rawMaterialId = e.target.value;
        setIngredient(ingredient);
    };
    
    const onChangeCount = (e) => {
        ingredient.count = e.target.value;
        setIngredient(ingredient);
    };
    
    return (
        <div>
            <Header text={ RouterUrl.INGREDIENTS_PAGE.name }/>
            
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
                        count
                    </th>
                </tr>
                {
                    ingredients.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                    <span>{ item.rawMaterialName }</span>
                                </td>
                                <td>
                                    <span>{ item.count }</span>
                                </td>
                                <td>
                                    <Button
                                        className={ 'close-button' }
                                        text={ 'Удалить' }
                                        onClick={ () => deleteIngredient(item.id) }
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
                                                        <p>Кол-во</p>
                                                        <input id='salary'
                                                               onChange={ onChangeCount }
                                                               value={ ingredients.count }
                                                               type='number'/>
                                                    </label>
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
                                                        onClick={ editIngredient }
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
                            <select onChange={ onChangeRawMaterial }>
                                {
                                    rawMaterials.map((item, index) => {
                                        return <option selected
                                                       value={ item.id }
                                                       key={ index }> { item.name } </option>;
                                    })
                                }
                            </select>
                            <label htmlFor='salary'>
                                <p>Кол-во</p>
                                <input id='salary' onChange={ onChangeCount }
                                       value={ ingredients.salary }
                                       type='number'/>
                            </label>
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

export default IngredientsPage;