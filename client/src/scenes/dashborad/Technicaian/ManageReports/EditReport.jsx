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
  Checkbox,
  TextareaAutosize
} from "@mui/material";
import Modal from 'react-modal';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import SendIcon from "@mui/icons-material/Send";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2'

const EditReport = () => {
  Modal.setAppElement('#root');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [area, setArea] = useState("")
  const [list, setList] = useState([]);
  const [InterventionGroup, setInterventionGroup] = useState([])
  const [improvement, setImprovement] = useState([
    {
      area: "",
      nonConformity: "",
      recomendation: "",
      attachment: [

      ],
    }
  ])
  const handleChangeGroup = (index, value) => {
    setInterventionGroup((prevInterventionGroup) => {
      const updatedGroup = [...prevInterventionGroup];
      updatedGroup[index] = value;
      return updatedGroup;
    });
  };

  const handleAddField = () => {
    setInterventionGroup((prevInterventionGroup) => [...prevInterventionGroup, '']);
  };

  const handleRemoveField = (index) => {
    setInterventionGroup((prevInterventionGroup) => {
      const updatedGroup = [...prevInterventionGroup];
      updatedGroup.splice(index, 1);
      return updatedGroup;
    });
  };

  const handleChange = (event) => {
    setArea(event.target.value);
  };

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
  const getMonth = (n) => {
    const currentDate = new Date();
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - n);

    const previousMonthName = previousMonth.toLocaleString('default', { month: 'long' });
    return previousMonthName
  }
  const { id } = useParams();
  const [report, setReport] = useState({})
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
            good: true,
            bad: false,
            observation: ""
          }
        ]
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
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

  const [photosList, setPhotosList] = useState([])

  useEffect(() => {
    getReport();


  }, []);

  useEffect(() => {
    fillNonConformity()
    floorsList()
    fillData()
  }, [report])

  const fillNonConformity = () => {
    if (report && report.nonConformities) {
      setNonConformity(report.nonConformities);
    }
  };
  const fillData = () => {
    if (report) {
      setOut([report.outsideBuilding?.items, report.outsideBuilding?.fireExtinguishers])
      setEntry([report.entryAndReception?.items, report.entryAndReception?.fireExtinguishers])
      const newFloors = report.floors?.map(floor => {
        const { name, items, parts } = floor;

        const floorItems = items.map(({ name, good, bad, observation }) => ({
          name,
          good,
          bad,
          observation
        }));

        const floorParts = parts.map(part => {
            const { name, items, fireExtinguishers } = part;

            const partItems = items.map(({ name, good, bad, observation }) => ({
                name,
                good,
                bad,
                observation
            }));

            const partFireExtinguishers = fireExtinguishers.map(({ name, type, good, bad, observation }) => ({
                name,
                type,
                good,
                bad,
                observation
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
      setPhotosList(report.photos)
    }
  }

  console.log(floors, "floros")
  const floorsList = () => {
    if (report && report.floors) { // Add a null check for company and company.floors
      let arr = ["entryAndReception", "outsideBuilding"];
      report.floors.forEach((e) => {
        arr.push(e.name);
      });
      setList(arr);
    }
  };

  const getReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/dashboard/technician/manageReports/getReport/${id}`,
        { withCredentials: true }
      );
      const data = response.data;
      setReport(data);


    } catch (error) {
      console.log(error);
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

  const [isOpenI, setIsOpenI] = useState(false);
  const [selectedPhotosI, setSelectedPhotosI] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState({});

  const openModal = (index) => {
    setActiveIndex(index);
    setSelectedPhotos((prevSelectedPhotos) => ({
      ...prevSelectedPhotos,
      [index]: improvement[index]?.attachment?.map((photo) => photo.url) || []
    }));
    setIsOpenI((prevIsOpenI) => ({
      ...prevIsOpenI,
      [index]: true
    }));
  };
  
  const closeModal = () => {
    setIsOpenI((prev) => ({ ...prev, [activeIndex]: false }));
    setActiveIndex(null);
  };
  console.log(improvement, "improvment")
  // Function to handle photo selection
  const handlePhotoSelectionI = (photoId) => {
    setSelectedPhotos((prevSelectedPhotos) => {
      const currentSelectedPhotos = [...prevSelectedPhotos[activeIndex]];
      const photoIndex = currentSelectedPhotos.indexOf(photoId);
  
      if (photoIndex !== -1) {
        currentSelectedPhotos.splice(photoIndex, 1);
      } else {
        currentSelectedPhotos.push(photoId);
      }
  
      return {
        ...prevSelectedPhotos,
        [activeIndex]: currentSelectedPhotos
      };
    });
  };

  const saveImprovement = () => {
    // Get the selected photos
    const selectedPhotoUrls = selectedPhotos[activeIndex].map((photoId) =>
      photosList.find((image) => image._id === photoId)?.url
    );
  
    // Update the attachment state for the active improvement
    setImprovement((prevImprovement) => {
      const updatedImprovement = [...prevImprovement];
      updatedImprovement[activeIndex].attachment = selectedPhotoUrls.map((url) => ({ url }));
      return updatedImprovement;
    });
  
    // Close the modal
    closeModal();
  };
  const handleRecommendationChange = (index, value) => {
    const updatedImprovements = [...improvement];
    updatedImprovements[index].recommendation = value;
    setImprovement(updatedImprovements);
  };

  const handleNonConformityChange = (index, value) => {
    const updatedImprovements = [...improvement];
    updatedImprovements[index].nonConformity = value;
    setImprovement(updatedImprovements);
  };
  const handleAreaChange = (index, value) => {
    const updatedImprovements = [...improvement];
    updatedImprovements[index].area = value;
    setImprovement(updatedImprovements);
  };

  const handleAddBox = () => {
    const newImprovement = {
      area: "",
      nonConformity: "",
      recommendation: "",
      attachment: [],
    };

    setImprovement([...improvement, newImprovement]);
  };
  console.log(improvement)

  const handleRemoveBox = (index) => {
    const updatedImprovements = [...improvement];
    updatedImprovements.splice(index, 1);
    setImprovement(updatedImprovements);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields have a truthy value

    const formData = {
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
        InterventionGroup ,
        improvement
    };
    console.log("formdata", formData)

    try {
        setLoading(true);
        const response = await axios.put(
            `http://localhost:3000/api/dashboard/technician/manageReports/editReport/${id}`,
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
    <Box sx={{ marginBottom: "100px", marginTop: "50px", display: "flex", flexDirection: "column", gap: "40px" }}>
      <Box sx={{ width: "1000px" }}>
        <h2>Moderator observation</h2>
        <p>{report.comment}</p>
        <h2>Table of non-Conformities</h2>
        <Button variant="contained" onClick={addRow}>Add Row</Button>
        <div style={{ width: "100%", overflowX: "auto" }}>

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
                    <CustomTextField
                      type="text"
                      value={row.num}
                      onChange={(e) => updateRow(index, "num", e.target.value)}
                      variant="outlined"
                      style={{ width: "7ch" }}

                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={row.location}
                      onChange={(e) => updateRow(index, "location", e.target.value)}
                      variant="outlined"
                      style={{ width: "20ch" }}


                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={row.nonConformity}
                      onChange={(e) => updateRow(index, "nonConformity", e.target.value)}
                      variant="outlined"
                      style={{ width: "20ch" }}


                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={row.inspectOrComment}
                      onChange={(e) => updateRow(index, "inspectOrComment", e.target.value)}
                      variant="outlined"
                      style={{ width: "50ch" }}
                      multiline
                      rows={2}
                    />
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
                    <input
                      type="file"
                      multiple
                      onChange={(e) => updateRow(index, "attachment", e.target.files)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={row.recommendation}
                      onChange={(e) => updateRow(index, "recommendation", e.target.value)}
                      variant="outlined"
                      style={{ width: "50ch" }}

                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      type="text"
                      value={row.month1}
                      onChange={(e) => updateRow(index, "month1", e.target.value)}
                      variant="outlined"

                    >
                      <MenuItem value="Ok">OK</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                      <MenuItem value="*-*">*-*</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      type="text"
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
                    <TextField
                      type="text"
                      value={row.criticity}
                      onChange={(e) => updateRow(index, "criticity", e.target.value)}
                      variant="outlined"

                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.priority}
                      onChange={(e) => updateRow(index, "priority", e.target.value)}
                      variant="outlined"

                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => removeRow(index)}>Remove</Button>
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
                    <TableCell style={{color: "#11b28a"}}>Name</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
                    <TableCell style={{color: "#11b28a"}}>Fire Extinguishers</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Type</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
                    <TableCell style={{color: "#11b28a"}}>Name</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
                    <TableCell style={{color: "#11b28a"}}>fire Extinguishers</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Type</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
        {(area !== "outsideBuilding" && area !== "entryAndReception" && floors?.find((floor) => floor.name === area)) && (
          <div>
            <h3>Selected Area: {area}</h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: "#11b28a"}}>Name</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                    <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {floors?.find((floor) => floor.name === area)?.items.map((item, index) => (
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
              {floors?.find((floor) => floor.name === area)?.parts.map((part, index) => (
                <div key={index}>
                  <h2 style={{color: "#11b28a", paddingLeft: "20px"}}>Part {part.name}</h2>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{color: "#11b28a"}}>Name</TableCell>
                        <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                        <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                        <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
                          <TableCell style={{color: "#11b28a"}}>fire Extinguishers</TableCell>
                          <TableCell style={{color: "#11b28a"}}>Type</TableCell>
                          <TableCell style={{color: "#11b28a"}}>Good</TableCell>
                          <TableCell style={{color: "#11b28a"}}>Bad</TableCell>
                          <TableCell style={{color: "#11b28a"}}>Observation</TableCell>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Intervention Group</h2>
        {InterventionGroup.length === 0 ? (
          <div className="group-container">
            <div className="first-division">
              <CustomTextField
                name="name"
                type="text"
                value=""
                onChange={(e) => handleChangeGroup(0, e.target.value)}
                required
              />

              <IconButton onClick={handleAddField}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          InterventionGroup.map((group, index) => (
            <div className="group-container" key={index} style={{ display: "flex" }}>
              <div className="first-division">
                <CustomTextField
                  name="name"
                  type="text"
                  value={group}
                  onChange={(e) => handleChangeGroup(index, e.target.value)}
                  required
                />

                {index === InterventionGroup.length - 1 && (
                  <IconButton onClick={handleAddField}>
                    <AddIcon />
                  </IconButton>
                )}
              </div>
              <div className="second-division">
                {InterventionGroup.length !== 1 && (
                  <IconButton onClick={() => handleRemoveField(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            </div>
          ))
        )}

      </Box>
      <Box>
  {improvement?.map((improvement, index) => (
    <div key={index}>
      <h2>Improvement {index + 1}</h2>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
        <InputLabel id={`area-label-${index}`}>Area:</InputLabel>
        <div style={{ paddingLeft: "81px" }}>
          <CustomSelect
            sx={{ width: "150px" }}
            labelId={`area-label-${index}`}
            id={`area-select-${index}`}
            name={`area-${index}`}
            value={improvement.area}
            onChange={(e) => handleAreaChange(index, e.target.value)}
          >
            {list?.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </CustomSelect>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
        <InputLabel id={`non-conformity-label-${index}`}>Non Conformity:</InputLabel>
        <div style={{ paddingLeft: "81px" }}>
          <CustomTextField
            name={`non-conformity-${index}`}
            type="text"
            value={improvement.nonConformity}
            onChange={(e) => handleNonConformityChange(index, e.target.value)}
            required
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
        <InputLabel id={`recommendation-label-${index}`}>Recommendation:</InputLabel>
        <div style={{ paddingLeft: "81px" }}>
          <CustomTextAuto
            name={`recommendation-${index}`}
            value={improvement.recommendation}
            rowsMin={3}
            placeholder="Enter your recommendation..."
            style={{ width: '100%' }}
            required
            onChange={(e) => handleRecommendationChange(index, e.target.value)}
          />
        </div>
      </div>
      <div>
        <Box style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
          <InputLabel id={`attachment-label-${index}`}>Attachment:</InputLabel>
          {/* Show Images Button */}
          <Button style={{ marginLeft: "81px" }} variant="contained" color="primary" onClick={() => openModal(index)}>
            Show Images
          </Button>
        </Box>
        <Modal isOpen={isOpenI[index]} onRequestClose={closeModal} ariaHideApp={false}>
          {/* Render the images here */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {photosList?.map((image, i) => (
              <div key={i} style={{ margin: "10px" }}>
                <img src={image.url} alt={`Image ${i}`} style={{ width: "200px", height: "200px" }} />
                <p style={{ color: "black" }}>{image.comment}</p>
                <Checkbox
  checked={selectedPhotosI[activeIndex]?.includes(image._id)}
  onChange={() => handlePhotoSelectionI(image._id)}
  style={{ color: "blue" }}
/>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button variant="contained" color="primary" onClick={saveImprovement}>
              Save
            </Button>
            {/* Close button */}
            <Button variant="contained" style={{ backgroundColor: "blue" }} onClick={closeModal}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
    
  ))}
  <Button variant="contained" color="primary" onClick={handleAddBox}>
    Add Box
  </Button>
  {improvement.length > 1 && (
    <Button variant="contained" color="secondary" onClick={handleRemoveBox}>
      Remove Box
    </Button>
  )}
  
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


const CustomTextAuto = styled(TextareaAutosize)({
  "& fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& textarea:focus + fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& textarea:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& textarea:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
});

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
const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: ${props => (props.checked ? '#118ab2' : 'initial')};
  }
`;

export default EditReport

