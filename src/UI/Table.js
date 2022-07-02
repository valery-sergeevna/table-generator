import React, {useEffect, useState} from "react";
import {generateKey} from "../helpers/generateKey";
import * as PropTypes from "prop-types";
import {IS_MOBILE} from '../helpers/detectMob';
export const Table = props => {
    const {table, copyTable, deleteTableCopy, deleteUser, editUserObj} = props;
    return (
        <>
            <div className="table">
                <div className="wrapper">
                    <button className="copy" onClick={copyTable}>Copy table</button>
                    <div className="delete" onClick={deleteTableCopy}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.577268 12.2432C0.421024 12.3995 0.333276 12.6114 0.333328 12.8324C0.33338 13.0535 0.421228 13.2654 0.577546 13.4216C0.733863 13.5779 0.945846 13.6656 1.16686 13.6655C1.38787 13.6655 1.59982 13.5777 1.75606 13.4213L6.90119 8.27698C6.91409 8.26405 6.92942 8.25378 6.94629 8.24678C6.96317 8.23978 6.98125 8.23618 6.99952 8.23618C7.01779 8.23618 7.03587 8.23978 7.05275 8.24678C7.06962 8.25378 7.08494 8.26405 7.09785 8.27698L12.243 13.4225C12.3203 13.4999 12.4122 13.5613 12.5133 13.6032C12.6144 13.6451 12.7227 13.6666 12.8322 13.6667C12.9416 13.6667 13.05 13.6452 13.1511 13.6033C13.2522 13.5615 13.3441 13.5001 13.4215 13.4227C13.4989 13.3454 13.5603 13.2535 13.6022 13.1524C13.6441 13.0513 13.6657 12.943 13.6657 12.8336C13.6657 12.7241 13.6442 12.6158 13.6024 12.5147C13.5605 12.4135 13.4991 12.3217 13.4218 12.2443L8.27719 7.09768C8.26426 7.08478 8.254 7.06945 8.247 7.05258C8.24 7.03571 8.23639 7.01762 8.23639 6.99936C8.23639 6.98109 8.24 6.963 8.247 6.94613C8.254 6.92926 8.26426 6.91394 8.27719 6.90104L13.4229 1.75612C13.5791 1.59966 13.6668 1.38754 13.6667 1.16643C13.6665 0.945324 13.5785 0.733333 13.4221 0.577095C13.2656 0.420858 13.0535 0.333172 12.8323 0.333328C12.6112 0.333485 12.3992 0.42147 12.243 0.577928L7.09785 5.72174C7.08494 5.73467 7.06962 5.74493 7.05275 5.75193C7.03587 5.75893 7.01779 5.76254 6.99952 5.76254C6.98125 5.76254 6.96317 5.75893 6.94629 5.75193C6.92942 5.74493 6.91409 5.73467 6.90119 5.72174L1.75606 0.577928C1.6787 0.500531 1.58684 0.439129 1.48575 0.397228C1.38465 0.355327 1.2763 0.333747 1.16686 0.333721C0.945846 0.333669 0.733863 0.421413 0.577546 0.577651C0.421228 0.733888 0.33338 0.945821 0.333328 1.16683C0.333276 1.38783 0.421024 1.59981 0.577268 1.75612L5.72185 6.90104C5.73478 6.91394 5.74504 6.92926 5.75204 6.94613C5.75904 6.963 5.76265 6.98109 5.76265 6.99936C5.76265 7.01762 5.75904 7.03571 5.75204 7.05258C5.74504 7.06945 5.73478 7.08478 5.72185 7.09768L0.577268 12.2432Z" fill="#EB5E58"/>
                        </svg>
                    </div>
                </div>
                <table className="table__content">
                    <thead>
                    <tr>
                        <th className="table__name">Name</th>
                        <th className="table__surname">Surname</th>
                        <th className="table__age">Age</th>
                        <th className="table__city">City</th>
                        <th className="table__last"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {table.map(user => <tr key={generateKey(user.surname + '_' + user.name)}>
                            <td className="table__name">{user.name}</td>
                            <td className="table__surname">{user.surname}</td>
                            <td className="table__age">{user.age}</td>
                            <td className="table__city">{user.city.label}</td>
                            <td className="table__last">
                                {IS_MOBILE.any() ? <div className="table__btns">
                                    <button className="button button--edited" onClick={()=>editUserObj(user)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path style={{stroke: 'black'}} d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path style={{stroke: 'black'}} d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                    <button className="button button--deleted" onClick={()=>deleteUser(user.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/></svg>
                                    </button>
                                </div> :
                                    <div className="table__btns">
                                        <button className="button button--edited" onClick={()=>editUserObj(user)}>Edit</button>
                                        <button className="button button--deleted" onClick={()=>deleteUser(user.id)}>Delete</button>
                                    </div>
                                }

                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
};

Table.propTypes = {
    table: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            city: PropTypes.object.isRequired,
        }).isRequired
    ).isRequired,
    copyTable: PropTypes.func.isRequired,
    deleteTableCopy: PropTypes.func,
    deleteUser:PropTypes.func.isRequired,
};
