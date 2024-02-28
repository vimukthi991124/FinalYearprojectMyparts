import userHistory_css from "./userHistory.module.css";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const UserHistory = () => {
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      await axios
        .get("http://localhost:4000/api/booking/getAllBookings")
        .then((response) => {
          console.log(response.data);
          setBookingDetails(response.data);
        })

        .catch((error) => {
          console.error("Error fetching booking details", error);
        });
    };
    fetchBookingDetails();
  }, []);

  return (
    <div>
      <TopNav />
      <div className={userHistory_css.content}>
        <div className={userHistory_css.contentImage}>
          <div className={userHistory_css.body}>
            <Grid item xs={12} style={{ width: "100%" }}>
              <Grid>
                <h2 style={{ color: "black" }}> booking List</h2>
                <TableContainer
                  component={Paper}
                  style={{ margin: "auto", width: "100%" }}
                >
                  <Table>
                    <TableHead className={userHistory_css.tableHead}>
                      <TableRow>
                        <TableCell className={userHistory_css.tableCell}>
                          Organization
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Address
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Facility
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Date
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Time
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Description
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={userHistory_css.tableBody}>
                      {bookingDetails.map((bookingDetail, index) => (
                        <TableRow
                          key={index}
                          className={userHistory_css.hoveredRow}
                        >
                          <TableCell className={userHistory_css.tableData}>
                            {bookingDetail.organizationName}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {bookingDetail.organizationAddress}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {bookingDetail.facility}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {moment(bookingDetail.bookingDate).format(
                              "YYYY-MM-DD"
                            )}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {moment(bookingDetail.Time).format("HH:mm")}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {bookingDetail.description}
                          </TableCell>
                          <TableCell className={userHistory_css.tableData}>
                            {bookingDetail.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
