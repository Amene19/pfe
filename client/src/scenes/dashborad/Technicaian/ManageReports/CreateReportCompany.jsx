import styled from "@emotion/styled";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Avatar,
    TableContainer,
    Paper,
    Table, TableHead, TableRow, TableCell, TableBody,
    Checkbox
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import SendIcon from "@mui/icons-material/Send";
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl';
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";




const CreateReport = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Function to handle photo click
    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setOpen(true);
    };

    // Function to close the modal
    const handleClose = () => {
        setSelectedPhoto(null);
        setOpen(false);
    };
    const { id } = useParams();
    const [company, setCompany] = useState({});
    const [outsideBuilding, setOut] = useState([
        [
            {
                name: "",
                good: true,
                bad: false,
                observation: ""
            }
        ],
        [
            {
                name: "",
                type: "",
                good: true,
                bad: false,
                observation: ""
            }
        ]
    ]);

    const [entryAndReception, setEntry] = useState([
        [
            {
                name: "",
                good: true,
                bad: false,
                observation: ""
            }
        ],
        [
            {
                name: "",
                good: true,
                bad: false,
                observation: ""
            }
        ]
    ]);
    const [floors, setFloors] = useState([
        [
            {
                name: "",
                good: true,
                bad: false,
                observation: ""
            }
        ],
        {
            parts: [
                [
                    {
                        name: "",
                        good: true,
                        bad: false,
                        observation: ""
                    }
                ],
                [
                    {
                        name: "",
                        type: "",
                        good: true,
                        bad: false,
                        observation: ""
                    }
                ]
            ]
        }
    ]);
    const [list, setList] = useState([]);
    const [area, setArea] = useState("")

    const floorsList = () => {
        if (company && company.floors) { // Add a null check for company and company.floors
            let arr = ["entryAndReception", "outsideBuilding"];
            company.floors.forEach((e) => {
                arr.push(e.name);
            });
            setList(arr);
        }
    };

    const handleChange = (event) => {
        setArea(event.target.value);
    };


    useEffect(() => {
        getCompany();


    }, []);

    useEffect(() => {
        fillNonConformity()
        floorsList()
        if (company && company.outsideBuilding) {
            const { fireExtinguishers = [], items = [] } = company.outsideBuilding;

            // Creating a new state object for items
            const itemState = items.map(({ title }) => ({
                name: title,
                good: true,
                bad: false,
                observation: ""
            }));

            // Creating a new state object for fire extinguishers
            const fireExtinguisherState = fireExtinguishers.map(({ name, type }) => ({
                name,
                type,
                good: true,
                bad: false,
                observation: ""
            }));

            // Creating the final state object
            const newState = [itemState, fireExtinguisherState];

            // Setting the new state using the 'setOut' function
            setOut(newState);
        }
        if (company && company.entryAndReception) {
            const { fireExtinguishers = [], items = [] } = company.entryAndReception;

            // Creating a new state object for items
            const itemStateEntry = items.map(({ title }) => ({
                name: title,
                good: true,
                bad: false,
                observation: ""
            }));

            // Creating a new state object for fire extinguishers
            const fireExtinguisherStateEntry = fireExtinguishers.map(({ name, type }) => ({
                name,
                type,
                good: true,
                bad: false,
                observation: ""
            }));

            // Creating the final state object
            const newStateEntry = [itemStateEntry, fireExtinguisherStateEntry];

            // Setting the new state using the 'setOut' function
            setEntry(newStateEntry);
        }
        if (company && company.floors) {
            const { floors } = company;

            if (floors && Array.isArray(floors)) {
                const newFloors = floors.map(floor => {
                    const { name, items, parts } = floor;

                    const floorItems = items.map(({ title }) => ({
                        name: title,
                        good: true,
                        bad: false,
                        observation: ""
                    }));

                    const floorParts = parts.map(part => {
                        const { name, items, fireExtinguishers } = part;

                        const partItems = items.map(({ title }) => ({
                            name: title,
                            good: true,
                            bad: false,
                            observation: ""
                        }));

                        const partFireExtinguishers = fireExtinguishers.map(({ name, type }) => ({
                            name,
                            type,
                            good: true,
                            bad: false,
                            observation: ""
                        }));

                        return {
                            name,
                            items: partItems,
                            fireExtinguishers: partFireExtinguishers
                        };
                    });

                    return {
                        name,
                        items: floorItems,
                        parts: floorParts
                    };
                });

                setFloors(newFloors);
            }
        }

    }, [company]);




    const getCompany = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/dashboard/technician/manageReports/getCompany/${id}`,
                { withCredentials: true }
            );
            const data = response.data;
            setCompany(data);
        } catch (error) {
            console.log(error);
        }
    };









    const [nonConformity, setNonConformity] = useState([
        {
            num: "",
            location: "",
            nonConformity: "",
            inspectOrComment: "",
            attachment: [],
            recommendation: "",
            month1: "",
            month2: "",
            criticity: "",
            priority: ""
        }
    ])
    const fillNonConformity = () => {
        if (company && company.nonConformities) {
            const updatedNonConformities = company.nonConformities.map((nc) => ({
                ...nc,
                month1: nc.month2, // Set month1 with the existing value
                month2: '', // Leave month2 empty
            }));
            setNonConformity(updatedNonConformities);
        }
    };

    const addRow = (event) => {
        event.preventDefault();
        const values = [...nonConformity];
        values.push({
            num: "",
            location: "",
            nonConformity: "",
            inspectOrComment: "",
            attachment: [],
            recommendation: "",
            month1: "",
            month2: "",
            criticity: "",
            priority: ""
        });
        setNonConformity(values);
    };

    const removeRow = (index) => {
        const newRows = nonConformity.filter((row, i) => i !== index);
        setNonConformity(newRows);
    };

    const updateRow = (index, key, value) => {
        if (key === "attachment") {
            const files = value;

            // Read each file using FileReader
            const fileReaders = Array.from(files).map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        resolve({
                            file,
                            dataURL: event.target.result,
                        });
                    };

                    reader.onerror = (event) => {
                        reject(event.target.error);
                    };

                    reader.readAsDataURL(file);
                });
            });

            // Wait for all file readers to finish
            Promise.all(fileReaders)
                .then((fileDataArray) => {
                    // Update the attachment array with the file data
                    const updatedAttachments = fileDataArray.map((fileData) => ({
                        url: fileData.dataURL,
                    }));

                    const updatedRow = { ...nonConformity[index], [key]: updatedAttachments };
                    const newRows = [...nonConformity];
                    newRows[index] = updatedRow;
                    setNonConformity(newRows);
                })
                .catch((error) => {
                    console.error("Error reading files:", error);
                });
        } else {
            const updatedRow = { ...nonConformity[index], [key]: value };
            const newRows = [...nonConformity];
            newRows[index] = updatedRow;
            setNonConformity(newRows);
        }
    };
    const getMonth = (n) => {
        const currentDate = new Date();
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - n);

        const previousMonthName = previousMonth.toLocaleString('default', { month: 'long' });
        return previousMonthName
    }

    const handleInputChange = (event, index, key) => {
        const { value } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[0][index][key] = value;
            return newState;
        });
    };
    const handleInputChangefire = (event, index, key) => {
        const { value } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[1][index][key] = value;
            return newState;
        });
    };

    const handleGoodCheckChange = (event, index) => {
        const { checked } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[0][index].good = checked;
            newState[0][index].bad = !checked; // Uncheck the 'bad' option
            return newState;
        });
    };


    const handleBadCheckChange = (event, index) => {
        const { checked } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[0][index].bad = checked;
            newState[0][index].good = !checked; // Uncheck the 'good' option
            return newState;
        });
    };

    const handleGoodCheckChangefire = (event, index) => {
        const { checked } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[1][index].good = checked;
            newState[1][index].bad = !checked; // Uncheck the 'bad' option
            return newState;
        });
    };

    const handleBadCheckChangefire = (event, index) => {
        const { checked } = event.target;

        setOut(prevState => {
            const newState = [...prevState];
            newState[1][index].bad = checked;
            newState[1][index].good = !checked; // Uncheck the 'good' option
            return newState;
        });
    };

    const handleInputChangeEntry = (event, index, key) => {
        const { value } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[0][index][key] = value;
            return newState;
        });
    };
    const handleInputChangefireEntry = (event, index, key) => {
        const { value } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[1][index][key] = value;
            return newState;
        });
    };

    const handleGoodCheckChangeEntry = (event, index) => {
        const { checked } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[0][index].good = checked;
            newState[0][index].bad = !checked; // Uncheck the 'bad' option
            return newState;
        });
    };

    const handleBadCheckChangeEntry = (event, index) => {
        const { checked } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[0][index].bad = checked;
            newState[0][index].good = !checked; // Uncheck the 'good' option
            return newState;
        });
    };
    const handleGoodCheckChangefireEntry = (event, index) => {
        const { checked } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[1][index].good = checked;
            newState[1][index].bad = !checked; // Uncheck the 'bad' option
            return newState;
        });
    };

    const handleBadCheckChangefireEntry = (event, index) => {
        const { checked } = event.target;

        setEntry(prevState => {
            const newState = [...prevState];
            newState[1][index].bad = checked;
            newState[1][index].good = !checked; // Uncheck the 'good' option
            return newState;
        });
    };


    const handleGoodCheckChangeItemFloor = (event, index, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                floor.items[index].good = checked;
                floor.items[index].bad = !checked;
            }
            return newState;
        });
    };

    const handleBadCheckChangeItemFloor = (event, index, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                floor.items[index].bad = checked;
                floor.items[index].good = !checked
            }
            return newState;
        });
    };

    const handleInputChangeItemFloor = (event, index, key, area) => {
        const { value } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                floor.items[index][key] = value;
            }
            return newState;
        });
    };

    const handleGoodCheckChangeItemPart = (event, itemIndex, partName, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.items[itemIndex].good = checked;
                    part.items[itemIndex].bad = !checked;
                }
            }
            return newState;
        });
    };

    const handleBadCheckChangeItemPart = (event, itemIndex, partName, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.items[itemIndex].bad = checked;
                    part.items[itemIndex].good = !checked;
                }
            }
            return newState;
        });
    };

    const handleInputChangeItemPart = (event, itemIndex, key, partName, area) => {
        const { value } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.items[itemIndex][key] = value;
                }
            }
            return newState;
        });
    };

    const handleGoodCheckChangePartFire = (event, index, partName, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.fireExtinguishers[index].good = checked;
                    part.fireExtinguishers[index].bad = !checked;
                }
            }
            return newState;
        });
    };

    const handleBadCheckChangePartFire = (event, index, partName, area) => {
        const { checked } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.fireExtinguishers[index].bad = checked;
                    part.fireExtinguishers[index].good = !checked;
                }
            }
            return newState;
        });
    };

    const handleInputChangePartFire = (event, index, key, partName, area) => {
        const { value } = event.target;

        setFloors(prevState => {
            const newState = [...prevState];
            const floor = newState.find(floor => floor.name === area);
            if (floor) {
                const part = floor.parts.find(part => part.name === partName);
                if (part) {
                    part.fireExtinguishers[index][key] = value;
                }
            }
            return newState;
        });
    };

    const [photos, setPhotos] = useState([]);
    const videoRef = useRef(null);
    const [cameraStream, setCameraStream] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    // Function to initialize camera stream
    const initializeCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setCameraStream(stream);
            setIsCameraOn(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    // Function to stop camera stream
    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
            setCameraStream(null);
            setIsCameraOn(false);
        }
    };

    // Function to handle camera capture
    const handleCameraCapture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg');
        const newPhoto = {
            url: dataUrl,
            comment: '',
        };
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    };

    // Function to handle comment change
    const handleCommentChange = (index, comment) => {
        setPhotos((prevPhotos) => {
            const updatedPhotos = [...prevPhotos];
            updatedPhotos[index].comment = comment;
            return updatedPhotos;
        });
    };

    // Function to handle photo deletion
    const handlePhotoDelete = (index) => {
        setPhotos((prevPhotos) => {
            const updatedPhotos = [...prevPhotos];
            updatedPhotos.splice(index, 1);
            return updatedPhotos;
        });
    };

    // Initialize camera stream when component mounts
    useEffect(() => {
        if (isCameraOn) {
            initializeCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isCameraOn]);

    console.log(outsideBuilding, "outsideBuilding")
    console.log(entryAndReception, "entryAndReception")
    console.log(floors, "floors")
    console.log(company.nonConformities, "nonConf")
    console.log(photos, "photos")
    console.log(nonConformity)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all fields have a truthy value

        const formData = {
            companyName: company.name,
            address: company.address,
            totalEmployees: company.totalEmployees,
            natureOfBusiness: company.natureOfBusiness,
            natureOfRisk: company.natureOfRisk,
            creationDate: company.creationDate,
            image: company.image,
            outsideBuilding: {
                name: "OutsideBuilding",
                items: outsideBuilding[0],
                fireExtinguishers: outsideBuilding[1],
            },
            entryAndReception: {
                name: "EntryAndReception",
                items: entryAndReception[0],
                fireExtinguishers: entryAndReception[1],
            },
            floors: floors,
            nonConformities: nonConformity,
            photos
        };
        console.log("formdata", formData)

        try {
            setLoading(true);
            const response = await axios.post(
                `http://localhost:3000/api/dashboard/technician/manageReports/create`,
                formData,
                { withCredentials: true }
            );
            Swal.fire(
                'Good job!',
                'Collect Data Completed!',
                'success'
            )
            navigate("/technician/manageReports");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };
    return (
        <Box sx={{
            marginBottom: "100px",
            marginTop: "50px",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
        }}>
            <CustomButton
        variant="outlined"
        sx={{ width: "100px" }}
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        to={`/technician/manageReports`}
      >
        {" "}
        Back
      </CustomButton>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
      >

        {company.image && (
          <Avatar
            sx={{ width: 200, height: 200, borderRadius: "0" }}
            src={company.image.url}
          />
        )}
      </Box>
      <Box>
        <h2 style={{ color: "#118ab2" }}>General Informations:</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="company table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Company name:{" "}
                </TableCell>
                <TableCell>{company.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                <TableCell>{company.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Employees:
                </TableCell>
                <TableCell>{company.totalEmployees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nature of business:
                </TableCell>
                <TableCell>{company.natureOfBusiness}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nature of risk:
                </TableCell>
                <TableCell>{company.natureOfRisk}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
            <Box sx={{ width: "600px" }}>


                <h2>Table of Non-Conformity</h2>
                <div style={{ width: "120%", overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>location</TableCell>
                                <TableCell>NonConformity</TableCell>
                                <TableCell>inspectOrComment</TableCell>
                                <TableCell>attachment</TableCell>
                                <TableCell>recommendation</TableCell>
                                <TableCell>{getMonth(1)}</TableCell>
                                <TableCell>{getMonth(0)}</TableCell>
                                <TableCell>criticity</TableCell>
                                <TableCell>priority</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nonConformity?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {row.num}
                                    </TableCell>
                                    <TableCell>
                                        {row.location}
                                    </TableCell>
                                    <TableCell>
                                        {row.nonConformity}
                                    </TableCell>
                                    <TableCell>
                                        {row.inspectOrComment}
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {row.attachment && row.attachment.map((file, fileIndex) => (
                                                <div
                                                    key={fileIndex}
                                                    style={{ width: '50px', height: '50px', border: '1px solid #ccc', cursor: 'pointer', display: "flex", justifyContent: "center" }}
                                                    onClick={() => handlePhotoClick(file.url)}
                                                >
                                                    <img src={file.url} alt={`Attachment ${fileIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                                </div>
                                            ))}
                                        </div>


                                        {/* Modal */}
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogContent>
                                                {selectedPhoto && <img src={selectedPhoto} alt="Selected Photo" style={{ width: '100%', height: 'auto' }} />}
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>
                                        {row.recommendation}
                                    </TableCell>
                                    <TableCell>
                                        {row.month1}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={row.month2}
                                            onChange={(e) => updateRow(index, "month2", e.target.value)}
                                            variant="outlined"
                                        >
                                            <MenuItem value="Ok">OK</MenuItem>
                                            <MenuItem value="NO">NO</MenuItem>
                                            <MenuItem value="*-*">*-*</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        {row.criticity}
                                    </TableCell>
                                    <TableCell>
                                        {row.priority}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Box>
            <Box>
                <h2>Choose an assessment area</h2>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Area</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={area}
                            label="Area"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {list?.map(e => (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box>

                {(area == "outsideBuilding") && (
                    <div>
                        <h3>Selected Area: {area}</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Good</TableCell>
                                        <TableCell>Bad</TableCell>
                                        <TableCell>Observation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {outsideBuilding[0]?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                
                                                    value={item.good}
                                                    checked={item.good}
                                                    onChange={(event) => handleGoodCheckChange(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.bad}
                                                    checked={item.bad}
                                                    onChange={(event) => handleBadCheckChange(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={item.observation}
                                                    onChange={(event) => handleInputChange(event, index, 'observation')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>fire Extinguishers</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Good</TableCell>
                                        <TableCell>Bad</TableCell>
                                        <TableCell>Observation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {outsideBuilding[1]?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.good}
                                                    checked={item.good}
                                                    onChange={(event) => handleGoodCheckChangefire(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.bad}
                                                    checked={item.bad}
                                                    onChange={(event) => handleBadCheckChangefire(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={item.observation}
                                                    onChange={(event) => handleInputChangefire(event, index, 'observation')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                {(area == "entryAndReception") && (
                    <div>
                        <h3>Selected Area: {area}</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Good</TableCell>
                                        <TableCell>Bad</TableCell>
                                        <TableCell>Observation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {entryAndReception[0]?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.good}
                                                    checked={item.good}
                                                    onChange={(event) => handleGoodCheckChangeEntry(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.bad}
                                                    checked={item.bad}
                                                    onChange={(event) => handleBadCheckChangeEntry(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={item.observation}
                                                    onChange={(event) => handleInputChangeEntry(event, index, 'observation')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>fire Extinguishers</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Good</TableCell>
                                        <TableCell>Bad</TableCell>
                                        <TableCell>Observation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {entryAndReception[1]?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.good}
                                                    checked={item.good}
                                                    onChange={(event) => handleGoodCheckChangefireEntry(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.bad}
                                                    checked={item.bad}
                                                    onChange={(event) => handleBadCheckChangefireEntry(event, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={item.observation}
                                                    onChange={(event) => handleInputChangefireEntry(event, index, 'observation')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                {(area !== "outsideBuilding" && area !== "entryAndReception" && floors.find((floor) => floor.name === area)) && (
                    <div>
                        <h3>Selected Area: {area}</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Good</TableCell>
                                        <TableCell>Bad</TableCell>
                                        <TableCell>Observation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {floors.find((floor) => floor.name === area)?.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.good}
                                                    checked={item.good}
                                                    onChange={(event) => handleGoodCheckChangeItemFloor(event, index, area)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <StyledCheckbox
                                                    value={item.bad}
                                                    checked={item.bad}
                                                    onChange={(event) => handleBadCheckChangeItemFloor(event, index, area)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={item.observation}
                                                    onChange={(event) => handleInputChangeItemFloor(event, index, 'observation', area)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                            {floors.find((floor) => floor.name === area)?.parts.map((part, index) => (
                                <div key={index}>
                                    <h2>{part.name}</h2>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Good</TableCell>
                                                <TableCell>Bad</TableCell>
                                                <TableCell>Observation</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {part.items.map((item, itemIndex) => (
                                                <TableRow key={itemIndex}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>
                                                        <StyledCheckbox
                                                            value={item.good}
                                                            checked={item.good}
                                                            onChange={(event) => handleGoodCheckChangeItemPart(event, itemIndex, part.name, area)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <StyledCheckbox
                                                            value={item.bad}
                                                            checked={item.bad}
                                                            onChange={(event) => handleBadCheckChangeItemPart(event, itemIndex, part.name, area)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            value={item.observation}
                                                            onChange={(event) => handleInputChangeItemPart(event, itemIndex, 'observation', part.name, area)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>fire Extinguishers</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Good</TableCell>
                                                    <TableCell>Bad</TableCell>
                                                    <TableCell>Observation</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {part.fireExtinguishers.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.type}</TableCell>
                                                        <TableCell>
                                                            <StyledCheckbox
                                                                value={item.good}
                                                                checked={item.good}
                                                                onChange={(event) => handleGoodCheckChangePartFire(event, index, part.name, area)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <StyledCheckbox
                                                                value={item.bad}
                                                                checked={item.bad}
                                                                onChange={(event) => handleBadCheckChangePartFire(event, index, part.name, area)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                value={item.observation}
                                                                onChange={(event) => handleInputChangePartFire(event, index, 'observation', part.name, area)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            ))}
                        </TableContainer>

                    </div>



                )}

            </Box>
            <Box>
                <h2>Collect Photos</h2>
                <div style={{display: "flex", flexDirection: "column", gap:"20px"}}>
                    <video ref={videoRef} autoPlay></video>
                    {isCameraOn ? (
                        <CustomButton onClick={stopCamera}>Stop Camera</CustomButton>
                    ) : (
                        <CustomButton onClick={() => setIsCameraOn(true)}>Start Camera</CustomButton>
                    )}
                    <CustomButton onClick={handleCameraCapture}>Capture Photo</CustomButton>

                    {photos.length > 0 && (
                        <div>
                            <h3>Photos:</h3>
                            <div>
                                {photos.length > 0 && (
                                    <div>
                                        <h3>Photos:</h3>
                                        <div>
                                            {photos.map((photo, index) => (
                                                <div key={index} style={{ margin: '5px', display: 'flex', flexDirection:"column", gap:"20px" }}>
                                                    <img src={photo.url} alt="Captured" />
                                                    <CustomTextField
                                                        type="text"
                                                        value={photo.comment}
                                                        onChange={(e) => handleCommentChange(index, e.target.value)}
                                                        placeholder="Add a comment"
                                                    />
                                                    <CustomButton onClick={() => handlePhotoDelete(index)}>Delete</CustomButton>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Box>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <CustomButton
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                >
                    {loading ? "Loading..." : "Confirm"}
                </CustomButton>
            </div>
        </Box>
    )
}




const CustomTextField = styled(TextField)({
    "& fieldset": {
        borderColor: "#66B2FF !important",
    },
    "& input:focus + fieldset": {
        borderColor: "#66B2FF !important",
    },
    "& label.Mui-focused": {
        color: "white",
    },
    "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important",
    },
});

const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: ${props => (props.checked ? '#118ab2' : 'initial')};
  }
`;

const CustomSelect = styled(Select)({
    "& fieldset": {
        borderColor: "#66B2FF !important",
    },
    "& input:focus + fieldset": {
        borderColor: "#66B2FF !important",
    },
    "& label.Mui-focused": {
        color: "white",
    },
    "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important",
    },
});

const CustomButton = styled(Button)({
    background: "#118ab2",
    border: 0,
    borderRadius: 10,
    color: "white",
    height: 48,
    padding: "0 30px",
});


export default CreateReport