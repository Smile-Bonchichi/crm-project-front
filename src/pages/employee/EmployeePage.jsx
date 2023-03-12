import React, { useEffect, useState } from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import axios from "../../app/rest";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";

const EmployeePage = () => {
        const [employee, setEmployee] = useState({});
        const [employees, setEmployees] = useState([]);
        const [jobTitles, setJobTitles] = useState([]);

        const [openAdd, setOpenAdd] = useState(false);
        const [openEdit, setOpenEdit] = useState(false);
        const [editId, setEditId] = useState(0);

        useEffect(() => {
            getAll();
        }, []);

        const getAll = () => {
            axios.get(`/user`).then(res => {
                setEmployees(res);
                getAllJobTitle();
            });
        }

        const getAllJobTitle = () => {
            axios.get(`/dictionary/job-title`).then(res => {
                setJobTitles(res)
            })
        }

        const addEmployee = () => {
            axios.post(`/user`, employee)
                .then(() => {
                    getAll();
                })

            window.location.reload();
        }

        const editEmployee = () => {
            employee.id = editId;

            axios.post(`/user`, employee)
                .then(() => {
                    getAll();
                })

            window.location.reload();
        }

        const deleteEmployee = (id) => {
            axios.delete(`/user?id=${ id }`)
                .then(() => {
                    getAll();
                })
        }

        const onChangeName = (e) => {
            employee.name = e.target.value
            setEmployee(employee);
        }

        const onChangeJobTitle = (e) => {
            employee.jobTitleId = e.target.value
            setEmployee(employee);
        }

        const onChangeSalary = (e) => {
            employee.salary = e.target.value
            setEmployee(employee);
        }

        const onChangeAddress = (e) => {
            employee.address = e.target.value
            setEmployee(employee);
        }

        const onChangePhoneNumber = (e) => {
            employee.phoneNumber = e.target.value
            setEmployee(employee);
        }

        return (
            <div>
                <Header text={ RouterUrl.EMPLOYEE_PAGE.name }/>

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
                            Должность
                        </th>

                        <th style={ {
                            border: 'thick double #32a1ce'
                        } }>
                            Зарплата
                        </th>

                        <th style={ {
                            border: 'thick double #32a1ce'
                        } }>
                            Адресс
                        </th>

                        <th style={ {
                            border: 'thick double #32a1ce'
                        } }>
                            Номер телефона
                        </th>
                    </tr>
                    {
                        employees.map((item, index) => {
                            return (
                                <tr key={ index }>
                                    <td>
                                        <span>{ item.name }</span>
                                    </td>
                                    <td>
                                        <span>{ item.jobTitleName }</span>
                                    </td>
                                    <td>
                                        <span>{ item.salary }</span>
                                    </td>
                                    <td>
                                        <span>{ item.address }</span>
                                    </td>
                                    <td>
                                        <span>{ item.phoneNumber }</span>
                                    </td>
                                    <td>
                                        <Button
                                            className={ 'close-button' }
                                            text={ 'Удалить' }
                                            onClick={ () => deleteEmployee(item.id) }
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
                                                            <p>Имя</p>
                                                            <input id='name' onChange={ onChangeName }
                                                                   value={ employee.name } type="text"/>
                                                        </label>
                                                        <p>Должность</p>
                                                        <select onChange={ onChangeJobTitle }>
                                                            {
                                                                jobTitles
                                                                    .map((item, index) => {
                                                                        return <option selected value={ item.id }
                                                                                       key={ index }> { item.name } </option>
                                                                    })
                                                            }
                                                        </select>
                                                        <label htmlFor="salary">
                                                            <p>Зарплата</p>
                                                            <input id='salary' onChange={ onChangeSalary }
                                                                   value={ employee.salary } type="number"/>
                                                        </label>
                                                        <label htmlFor="address">
                                                            <p>Адресс</p>
                                                            <input id='address' onChange={ onChangeAddress }
                                                                   value={ employee.address }
                                                                   type="text"/>
                                                        </label>
                                                        <label htmlFor="phoneNumber">
                                                            <p>Номер телефона</p>
                                                            <input id='phoneNumber' onChange={ onChangePhoneNumber }
                                                                   value={ employee.phoneNumber }
                                                                   type="text"/>
                                                        </label>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                            className={ 'secondary-button' }
                                                            text={ 'Закрыть' }
                                                            onClick={ setOpenEdit }
                                                        />

                                                        <Button
                                                            className={ 'primary-button' }
                                                            text={ 'Сохранить' }
                                                            onClick={ () => editEmployee(item.id) }
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
                                    <p>Имя</p>
                                    <input id='name' onChange={ onChangeName } value={ employee.name } type="text"/>
                                </label>
                                <label htmlFor="jobTitle">
                                    <p>Должность</p>
                                    <select onChange={ onChangeJobTitle }>
                                        {
                                            jobTitles
                                                .map((item, index) => {
                                                    return <option selected value={ item.id }
                                                                   key={ index }> { item.name } </option>
                                                })
                                        }
                                    </select>
                                </label>
                                <label htmlFor="salary">
                                    <p>Зарплата</p>
                                    <input id='salary' onChange={ onChangeSalary } value={ employee.salary } type="number"/>
                                </label>
                                <label htmlFor="address">
                                    <p>Адресс</p>
                                    <input id='address' onChange={ onChangeAddress } value={ employee.address }
                                           type="text"/>
                                </label>
                                <label htmlFor="phoneNumber">
                                    <p>Номер телефона</p>
                                    <input id='phoneNumber' onChange={ onChangePhoneNumber } value={ employee.phoneNumber }
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
                                    onClick={ addEmployee }
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

export default EmployeePage;