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
} from "@mui/material";
import defaultCompanyImage from "../../../../assets/companyIcon.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import defaultPlanImage from "../../../../assets/plan.png";
import SendIcon from "@mui/icons-material/Send";
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useEffect } from "react";

const EditCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [generalInformations, setGeneralInformations] = useState({
    companyName: "",
    address: "",
    totalEmployees: 0,
    natureOfBusiness: "",
    natureOfRisk: "",
    creationDate: "2022-05-01",
    image: "",
  });

  //Outside Building form
  const [formValues, setFormValues] = useState({
    value: [],
    inputFields: [
      {
        id: uuidv4(),
        name: "",
        type: "",
      },
    ],
  });
  //entry and reception
  const [formValuesEntry, setFormValuesEntry] = useState({
    value: [],
    inputFields: [
      {
        id: uuidv4(),
        name: "",
        type: "",
      },
    ],
  });

  const handleGeneralInformationsChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setGeneralInformations({
      ...generalInformations,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setGeneralInformations({
          ...generalInformations,
          image: reader.result,
        });
      };
    } else {
      setGeneralInformations({
        ...generalInformations,
        image: "",
      });
    }
  };
  //Outside Building functions
  const handleFormChange = (id, event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFormValues((prevFormValues) => {
      const updatedInputFields = prevFormValues.inputFields.map(
        (inputField) => {
          if (inputField.id === id) {
            return { ...inputField, [name]: value };
          } else {
            return inputField;
          }
        }
      );

      return { ...prevFormValues, inputFields: updatedInputFields };
    });
  };

  const handleAddFields = () => {
    const values = [...formValues.inputFields];
    values.push({
      id: uuidv4(),
      name: "",
      type: "",
    });
    setFormValues({ ...formValues, inputFields: values });
  };

  const handleRemoveFields = (id) => {
    const values = [...formValues.inputFields];
    const index = values.findIndex((value) => value.id === id);
    values.splice(index, 1);
    setFormValues({ ...formValues, inputFields: values });
  };

  //entry and reception functions
  const handleFormChangeEntry = (id, event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFormValuesEntry((prevFormValues) => {
      const updatedInputFields = prevFormValues.inputFields.map(
        (inputField) => {
          if (inputField.id === id) {
            return { ...inputField, [name]: value };
          } else {
            return inputField;
          }
        }
      );

      return { ...prevFormValues, inputFields: updatedInputFields };
    });
  };

  const handleAddFieldsEntry = () => {
    const values = [...formValuesEntry.inputFields];
    values.push({
      id: uuidv4(),
      name: "",
      type: "",
    });
    setFormValuesEntry({ ...formValuesEntry, inputFields: values });
  };

  const handleRemoveFieldsEntry = (id) => {
    const values = [...formValuesEntry.inputFields];
    const index = values.findIndex((value) => value.id === id);
    values.splice(index, 1);
    setFormValuesEntry({ ...formValuesEntry, inputFields: values });
  };

  const [floors, setFloors] = useState([
    {
      name: "",
      value: [],
      plan: "",
      parts: [
        {
          name: "",
          value: [],
          inputFields: [
            {
              id: uuidv4(),
              name: "",
              type: "",
            },
          ],
        },
      ],
    },
  ]);

  const handleAddFloor = () => {
    setFloors((prevFloors) => {
      const newFloor = {
        name: "",
        value: [],
        plan: "",
        parts: [
          {
            name: "",
            value: [],
            inputFields: [
              {
                id: uuidv4(),
                name: "",
                type: "",
              },
            ],
          },
        ],
      };
      return [...prevFloors, newFloor];
    });
  };

  const handleRemoveFloor = (floorIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      updatedFloors.splice(floorIndex, 1);
      return updatedFloors;
    });
  };

  const handleAddPart = (floorIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      const newPart = {
        name: "",
        value: [],
        inputFields: [
          {
            id: uuidv4(),
            name: "",
            type: "",
          },
        ],
      };
      updatedFloors[floorIndex].parts.push(newPart);
      return updatedFloors;
    });
  };

  const handleRemovePart = (floorIndex, partIndex) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];
      updatedFloors[floorIndex].parts.splice(partIndex, 1);
      return updatedFloors;
    });
  };

  const handleFloorChange = (floorIndex, name, value) => {
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      newFloors[floorIndex] = { ...newFloors[floorIndex], [name]: value };
      return newFloors;
    });
  };

  const handlePartChange = (floorIndex, partIndex, name, value) => {
    setFloors((prevFloors) => {
      const updatedFloors = [...prevFloors];

      // update the specific floor and part's name/value
      updatedFloors[floorIndex].parts[partIndex][name] = value;

      return updatedFloors;
    });
  };

  const handleFormChangeFloor = (
    floorIndex,
    partIndex,
    inputFieldId,
    fieldName,
    value
  ) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].parts[partIndex].inputFields = updatedFloors[
      floorIndex
    ].parts[partIndex].inputFields.map((inputField) => {
      if (inputField.id === inputFieldId) {
        return { ...inputField, [fieldName]: value };
      }
      return inputField;
    });
    setFloors(updatedFloors);
  };

  const handleAddFieldsParts = (floorIndex, partIndex) => {
    const newFloors = [...floors];
    const inputFields = [...newFloors[floorIndex].parts[partIndex].inputFields];
    inputFields.push({
      id: uuidv4(),
      name: "",
      type: "",
    });
    newFloors[floorIndex].parts[partIndex].inputFields = inputFields;
    setFloors(newFloors);
  };

  const handleRemoveFieldsParts = (floorIndex, partIndex, id) => {
    const newFloors = [...floors];
    const inputFields = [...newFloors[floorIndex].parts[partIndex].inputFields];
    const index = inputFields.findIndex((field) => field.id === id);
    inputFields.splice(index, 1);
    newFloors[floorIndex].parts[partIndex].inputFields = inputFields;
    setFloors(newFloors);
  };

  const handleFloorChangeTest = (event, newValue, floorIndex) => {
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      const floor = newFloors[floorIndex];
      floor.value = [
        ...floor.value,
        ...(newValue
          ? newValue.filter(
              (option) =>
                floor.value.findIndex((v) => v.title === option.title) === -1
            )
          : []),
      ];
      return newFloors;
    });
  };

  const handleImageChangeFloor = (floorIndex, file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFloors((prevFloors) => {
          const updatedFloor = {
            ...prevFloors[floorIndex],
            plan: reader.result,
          };
          const updatedFloors = [...prevFloors];
          updatedFloors[floorIndex] = updatedFloor;
          return updatedFloors;
        });
        console.log(reader.result);
      };
    } else {
      setFloors((prevFloors) => {
        const updatedFloor = { ...prevFloors[floorIndex], plan: "" };
        const updatedFloors = [...prevFloors];
        updatedFloors[floorIndex] = updatedFloor;
        return updatedFloors;
      });
    }
  };

  const handleParts = (event, newValue, floorIndex, partIndex) => {
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      const floor = newFloors[floorIndex];
      const part = floor.parts[partIndex];
      part.value = [
        ...part.value,
        ...(newValue
          ? newValue.filter(
              (option) =>
                part.value.findIndex((v) => v.title === option.title) === -1
            )
          : []),
      ];
      return newFloors;
    });
  };
  const handleDelete = (floorIndex, partIndex, chipIndex) => {
    setFloors((prevFloors) => {
      const newFloors = [...prevFloors];
      const part = newFloors[floorIndex].parts[partIndex];
      part.value.splice(chipIndex, 1);
      return newFloors;
    });
  };

  const loadCompanyDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/dashboard/admin/manageCompanies/getCompany/${id}`,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  };
  const isDataLoaded = useRef(false); // flag to keep track of whether the data is loaded or not

  useEffect(() => {
    if (!isDataLoaded.current) {
      // only load data if it hasn't been loaded yet
      loadCompanyDetails()
        .then((data) => {
          const formattedDate = new Date(data.creationDate)
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-");

          const [day, month, year] = formattedDate.split("-");
          const formattedDate2 = `${year}-${month}-${day}`;

          setGeneralInformations({
            companyName: data.name,
            address: data.address,
            totalEmployees: data.totalEmployees,
            natureOfBusiness: data.natureOfBusiness,
            natureOfRisk: data.natureOfRisk,
            creationDate: formattedDate2,
            image: data.image.url,
          });
          setFormValues((prevState) => ({
            ...prevState,
            value: [...data.outsideBuilding.items],
            inputFields: data.outsideBuilding.fireExtinguishers.map(
              (extinguisher) => ({
                id: extinguisher._id,
                name: extinguisher.name,
                type: extinguisher.type,
              })
            ),
          }));
          setFormValuesEntry((prevState) => ({
            ...prevState,
            value: [...data.entryAndReception.items],
            inputFields: data.entryAndReception.fireExtinguishers.map(
              (extinguisher) => ({
                id: extinguisher._id,
                name: extinguisher.name,
                type: extinguisher.type,
              })
            ),
          }));
          setFloors((prevState) => {
            const updatedFloors = [...prevState];

            for (let i = 0; i < data.floors.length; i++) {
              const floor = data.floors[i];

              const updatedFloor = {
                name: floor.name,
                value: [...floor.items],
                plan: floor.plan.url,
                parts: floor.parts.map((part) => {
                  const updatedPart = {
                    name: part.name,
                    value: [...part.items],
                    inputFields: part.fireExtinguishers.map((extinguisher) => ({
                      id: extinguisher._id,
                      name: extinguisher.name,
                      type: extinguisher.type,
                    })),
                  };

                  return updatedPart;
                }),
              };

              updatedFloors[i] = updatedFloor;
            }

            return updatedFloors;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const itemsValue = formValues.value;
    const entryAndReceptionValue = formValuesEntry.value;
    const fireExtinguishersValue = formValues.inputFields;
    const entryAndReceptionFireExtinguishersValue = formValuesEntry.inputFields;

    // Check if all fields have a truthy value

    const formData = {
      name: generalInformations.companyName,
      address: generalInformations.address,
      totalEmployees: generalInformations.totalEmployees,
      natureOfBusiness: generalInformations.natureOfBusiness,
      natureOfRisk: generalInformations.natureOfRisk,
      creationDate: generalInformations.creationDate,
      image: generalInformations.image,
      outsideBuilding: {
        name: "OutsideBuilding",
        items: itemsValue,
        fireExtinguishers: fireExtinguishersValue,
      },
      entryAndReception: {
        name: "EntryAndReception",
        items: entryAndReceptionValue,
        fireExtinguishers: entryAndReceptionFireExtinguishersValue,
      },
      floors: floors,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/dashboard/admin/manageCompanies/editCompany/${id}`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      navigate("/admin/manageCompanies");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" sx={{ padding: "50px" }}>
      <CustomButton
        variant="outlined"
        sx={{ width: "100px" }}
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        to={`/admin/manageCompanies`}
      >
        {" "}
        Back
      </CustomButton>
      <h1>Edit Company</h1>
      <Box>
        <h2>General Informations </h2>
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="companyName"
          label="Company Name"
          type="text"
          id="name"
          value={generalInformations.companyName}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          type="text"
          id="address"
          value={generalInformations.address}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="totalEmployees"
          label="Total Employees"
          type="number"
          id="totalEmployees"
          value={generalInformations.totalEmployees}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="natureOfBusiness"
          label="Nature Of Business"
          type="text"
          id="natureOfBusiness"
          value={generalInformations.natureOfBusiness}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="natureOfRisk"
          label="Nature Of Risk"
          type="text"
          id="natureOfRisk"
          value={generalInformations.natureOfRisk}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="creationDate"
          label="Creation Date"
          type="date"
          id="creationDate"
          value={generalInformations.creationDate}
          onChange={(event) => handleGeneralInformationsChange(event)}
        />
      </Box>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          paddingTop: "20px",
        }}
      >
        <Avatar
          sx={{ width: 120, height: 120 }}
          src={generalInformations.image || defaultCompanyImage}
        />
        <label htmlFor="file" className="label-file">
          Select an image
        </label>
        <input
          id="file"
          className="input-file"
          type="file"
          accept="image/"
          onChange={(event) => handleImageChange(event)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Outside Building</h2>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={formValues.value}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          onChange={(event, newValue) => {
            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              value: [
                ...prevFormValues.value,
                ...(newValue
                  ? newValue.filter(
                      (option) =>
                        prevFormValues.value.findIndex(
                          (v) => v.title === option.title
                        ) === -1
                    )
                  : []),
              ],
            }));
          }}
          options={items}
          getOptionLabel={(option) => option.title}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                key={index}
                label={option.title}
                {...getTagProps({ index })}
                onDelete={() => {
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    value: prevFormValues.value.filter(
                      (v) => v.title !== option.title
                    ),
                  }));
                }}
              />
            ))
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pick Designations"
              placeholder="Designation"
            />
          )}
        />
        <Box>
          <label htmlFor="Extinguisher">Fire Extinguisher(s)</label>
          {formValues.inputFields?.map((inputField, index) => (
            <div key={inputField.id} className="Extinguishers">
              <div className="first-division">
                <CustomTextField
                  name="name"
                  type="text"
                  id={`name-${inputField.id}`}
                  value={inputField.name}
                  onChange={(event) => handleFormChange(inputField.id, event)}
                  required
                />
                <ToggleButtonGroup
                  color="primary"
                  value={inputField.type}
                  exclusive
                  onChange={(event, value) =>
                    handleFormChange(inputField.id, {
                      target: { name: "type", value },
                    })
                  }
                  aria-label="Platform"
                  className="toggle-group"
                >
                  <ToggleButton value="Powder">Powder</ToggleButton>
                  <ToggleButton value="CO2">CO2</ToggleButton>
                </ToggleButtonGroup>

                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </div>
              <div className="second-division">
                {formValues.inputFields.length !== 1 && (
                  <IconButton
                    disabled={formValues.inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Entry and Reception</h2>
        <Autocomplete
          multiple
          id="fixed-tags-demo2"
          value={formValuesEntry.value}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          onChange={(event, newValue) => {
            setFormValuesEntry((prevFormValues) => ({
              ...prevFormValues,
              value: [
                ...prevFormValues.value,
                ...(newValue
                  ? newValue.filter(
                      (option) =>
                        prevFormValues.value.findIndex(
                          (v) => v.title === option.title
                        ) === -1
                    )
                  : []),
              ],
            }));
          }}
          options={items}
          getOptionLabel={(option) => option.title}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                key={index}
                label={option.title}
                {...getTagProps({ index })}
                onDelete={() => {
                  setFormValuesEntry((prevFormValues) => ({
                    ...prevFormValues,
                    value: prevFormValues.value.filter(
                      (v) => v.title !== option.title
                    ),
                  }));
                }}
              />
            ))
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pick Designations"
              placeholder="Designation"
            />
          )}
        />
        <Box>
          <div>
            <label htmlFor="Extinguisher">Fire Extinguisher(s)</label>
            {formValuesEntry.inputFields?.map((inputField, index) => (
              <div key={inputField.id} className="Extinguishers">
                <div className="first-division">
                  <CustomTextField
                    name="name"
                    type="text"
                    id={`name-${inputField.id}`}
                    value={inputField.name}
                    onChange={(event) =>
                      handleFormChangeEntry(inputField.id, event)
                    }
                    required
                  />
                  <ToggleButtonGroup
                    color="primary"
                    value={inputField.type}
                    exclusive
                    onChange={(event, value) =>
                      handleFormChangeEntry(inputField.id, {
                        target: { name: "type", value },
                      })
                    }
                    aria-label="Platform"
                    className="toggle-group"
                  >
                    <ToggleButton value="Powder">Powder</ToggleButton>
                    <ToggleButton value="CO2">CO2</ToggleButton>
                  </ToggleButtonGroup>

                  <IconButton onClick={handleAddFieldsEntry}>
                    <AddIcon />
                  </IconButton>
                </div>
                <div className="second-division">
                  {formValuesEntry.inputFields.length !== 1 && (
                    <IconButton
                      disabled={formValuesEntry.inputFields.length === 1}
                      onClick={() => handleRemoveFieldsEntry(inputField.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Floors</h2>
        {floors.map((floor, floorIndex) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            key={floorIndex}
          >
            <h3>Floor{floorIndex + 1}</h3>
            <CustomTextField
              name="floorName"
              type="text"
              id={`floor-name-${floorIndex}`}
              label="Floor Name"
              value={floor.name}
              onChange={(event) =>
                handleFloorChange(floorIndex, "name", event.target.value)
              }
              required
            />
            <Autocomplete
              multiple
              value={floor.value}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              onChange={(event, newValue) =>
                handleFloorChangeTest(event, newValue, floorIndex)
              }
              options={items}
              getOptionLabel={(option) => option.title}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, Index) => (
                  <Chip
                    key={Index}
                    label={option.title}
                    {...getTagProps({ Index })}
                    onDelete={() => {
                      setFloors((prevFloors) => {
                        const newFloors = [...prevFloors];
                        const currentFloor = newFloors[floorIndex];
                        currentFloor.value = currentFloor.value.filter(
                          (v) => v.title !== option.title
                        );
                        return newFloors;
                      });
                    }}
                  />
                ))
              }
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pick Designations"
                  placeholder="Designation"
                />
              )}
            />
            <Box
              sx={{
                mb: 5,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Avatar
                sx={{ width: "80%", height: 300, borderRadius: "0" }}
                src={floor.plan || defaultPlanImage}
              />
              <label htmlFor={`file-${floorIndex}`} className="label-file">
                Select a plan
              </label>
              <input
                id={`file-${floorIndex}`}
                className="input-file"
                type="file"
                accept="plan/*"
                onChange={(event) =>
                  handleImageChangeFloor(floorIndex, event.target.files[0])
                }
              />
            </Box>
            {floor.parts.map((part, partIndex) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  paddingLeft: "50px",
                }}
                key={partIndex}
              >
                <h4>Part{partIndex + 1}</h4>
                <CustomTextField
                  name="partName"
                  type="text"
                  id={`part-name-${partIndex}`}
                  label="Part Name"
                  value={part.name}
                  onChange={(event) =>
                    handlePartChange(
                      floorIndex,
                      partIndex,
                      "name",
                      event.target.value
                    )
                  }
                  required
                />
                <Autocomplete
                  multiple
                  id={`fixed-tags-demo2${floor}${part}`}
                  value={part.value}
                  isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                  }
                  onChange={(event, newValue) =>
                    handleParts(event, newValue, floorIndex, partIndex)
                  }
                  options={items}
                  getOptionLabel={(option) => option.title}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, Index) => (
                      <Chip
                        key={Index}
                        label={option.title}
                        {...getTagProps({ Index })}
                        onDelete={() =>
                          handleDelete(floorIndex, partIndex, Index)
                        }
                      />
                    ))
                  }
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pick Designations"
                      placeholder="Designation"
                    />
                  )}
                />
                <div>
                  <label htmlFor="Extinguisher">Fire Extinguisher(s)</label>
                  {part.inputFields?.map((inputField, index) => (
                    <div key={inputField.id} className="Extinguishers">
                      <div className="first-division">
                        <CustomTextField
                          name="name"
                          type="text"
                          id={`name-${inputField.id}`}
                          value={inputField.name}
                          onChange={(event) =>
                            handleFormChangeFloor(
                              floorIndex,
                              partIndex,
                              inputField.id,
                              "name",
                              event.target.value
                            )
                          }
                          required
                        />
                        <ToggleButtonGroup
                          color="primary"
                          value={inputField.type}
                          exclusive
                          onChange={(event, value) =>
                            handleFormChangeFloor(
                              floorIndex,
                              partIndex,
                              inputField.id,
                              "type",
                              value
                            )
                          }
                          aria-label="Platform"
                          className="toggle-group"
                        >
                          <ToggleButton value="Powder">Powder</ToggleButton>
                          <ToggleButton value="CO2">CO2</ToggleButton>
                        </ToggleButtonGroup>

                        <IconButton
                          onClick={() =>
                            handleAddFieldsParts(floorIndex, partIndex)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <div className="second-division">
                        {part.inputFields.length !== 1 && (
                          <IconButton
                            disabled={part.inputFields.length === 1}
                            onClick={() =>
                              handleRemoveFieldsParts(
                                floorIndex,
                                partIndex,
                                inputField.id
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {floor.parts.length < 2 && (
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<AddIcon />}
                    sx={{ width: "150px" }}
                    onClick={() => handleAddPart(floorIndex)}
                  >
                    {" "}
                    Add Part
                  </Button>
                )}
                {floor.parts.length !== 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ width: "150px" }}
                    onClick={() => handleRemovePart(floorIndex, partIndex)}
                  >
                    {" "}
                    Delete Part
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddIcon />}
          sx={{ width: "150px" }}
          onClick={handleAddFloor}
        >
          {" "}
          Add Floor
        </Button>
        {floors.length !== 1 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ width: "150px" }}
            disabled={floors.length === 1}
            onClick={handleRemoveFloor}
          >
            {" "}
            Delete Floor
          </Button>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <CustomButton variant="contained" onClick={handleSubmit}>
            Edit
          </CustomButton>
        </div>
      </Box>
    </Box>
  );
};

export default EditCompany;

const items = [
  { title: "Internal Parking" },
  { title: "assembly point" },
  { title: "cars Passage" },
  { title: "Pedestrians Passage" },
  { title: "Signalling and marking" },
  { title: "Guard cabin" },
  { title: "External equipment (TGBT)" },
  { title: "External staircase"},
  {
    title: "External parking",
  },
  { title: "Central Alarm" },
  { title: "DSA state" },
  { title: "Indications and evacuation plan" },
  { title: "emergency exit and doors" },
  { title: "Stage rescuer number" },
  { title: "Emergency exit status" },
  { title: "BBG state" },
  { title: "BA state" },
  { title: "Electric risk" },
  { title: "Lighting" },
  { title: "Heating and air conditioning" },
  { title: "Pharmacy Boxes" },
  { title: "rescuer list" },
  { title: "Red Phone" },
];

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
