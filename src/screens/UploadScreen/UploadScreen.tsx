import React, { useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { OnAuthScreenName, screenName } from '../../navigation/routes'
import Dropzone from 'react-dropzone'
import * as STYLED from './styled'
import theme from '../../themes'
import Image from 'react-native-scalable-image';
import { AuthContext, useDatabase, storageRef, databaseRef } from '../../firebase'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import Select from "react-select";
import Modal from 'react-modal'
import { XmarkSvg } from '../../assets'
import categoryArray from '../../data/categorys.json'

const options = categoryArray.map((item: any) => ({ value: item.type, label: item.type }))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
    },
    overlay: {
        backgroundColor: theme.colors.gradient.regular
    }
};

const UploadScreen = () => {
    const navigation = useNavigation()
    const [fileSelected, setFileSelected]: any = useState('')
    const [fileBlob, setFileBlob]: any = useState('')
    const { uploadImage }: any = useDatabase()
    const userState = useContext(AuthContext)
    const { currentUser }: any = userState
    const [description, setDescription]: any = useState('')
    const [location, setLocation]: any = useState('')
    const [selectCategory, setSelectCategory]: any = useState('')
    const [boolModal, setBoolModal] = useState(false)
    const [progressBar, setProgressBar]: any = useState(0)
    const onDropImage = (files: any) => {
        if (files.length > 0) {
            if (files[0].type === "image/jpeg") {
                const blobURL = URL.createObjectURL(files[0])
                setFileSelected(blobURL)
                setFileBlob(files[0])
            } else {
                alert("You must have jpeg image");
            }
        }

    }
    const onChangeImage = (e: any) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            if (e.target.files[0].type === "image/jpeg") {
                const blobURL = URL.createObjectURL(e.target.files[0])
                setFileSelected(blobURL)
                setFileBlob(e.target.files[0])
            } else {
                alert("You must have jpeg image");
            }
        }
    }
    const onSucessUpload = () => {
        if (progressBar > 99) {
            setBoolModal(false)
            navigation.navigate(screenName.USER_STACK, {
                screen: OnAuthScreenName.ACCOUNT
            })
        }
    }

    const onUpload = async () => {
        setBoolModal(true)
        const category = selectCategory.map((oneCategory: any) => oneCategory.value)
        const allUser = currentUser
        const generateID = nanoid()
        const fileId = generateID + ".jpg"
        const uploadTask = storageRef.imagesStorage().child(`/${fileId}`).put(fileBlob)
        await uploadTask.on(
            "state_changed",
            (snapshot: any) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(Math.floor(progress))
            },
            (error: any) => {
                console.error(error.message);
            },
            () => {
                setFileSelected('')
                setFileBlob('')
                setLocation('')
                setDescription('')
                setSelectCategory('')
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
                    uploadImage({ user_id: allUser.uid, fileName: downloadURL, description, location, username: allUser.username, date: Date.now() })
                });
            }
        );
        await databaseRef.imagesFileDatabase().push({
            user_id: allUser.uid,
            fileName: fileId,
            description,
            location,
            username: allUser.username,
            category,
            date: Date.now()

        })
    }
    const setDisabled = selectCategory.length === 0 && location === '' && description === ''
    return (
        <STYLED.FullPage>
            <Modal
                isOpen={boolModal}
                style={customStyles}
                onRequestClose={() => onSucessUpload()}
                ariaHideApp={false}
            >
                <STYLED.SucessUploadView
                    style={{ display: progressBar > 99 ? 'flex' : 'none' }}
                >
                    <STYLED.SuccesUploadText>Upload has been sucessful</STYLED.SuccesUploadText>
                    <TouchableOpacity onPress={() => onSucessUpload()}>
                        <XmarkSvg fillColor={theme.colors.black} />
                    </TouchableOpacity>
                </STYLED.SucessUploadView>
                <STYLED.ProgressBarBackground>
                    <STYLED.ProgressBarProgress
                        style={{
                            width: `${progressBar}%`,
                        }}
                    >
                        <STYLED.ProgressBarText>
                            {progressBar}%
                        </STYLED.ProgressBarText>
                    </STYLED.ProgressBarProgress>
                </STYLED.ProgressBarBackground>
            </Modal>
            {fileSelected !== '' ?
                <STYLED.SetImageUploadView>
                    <Image
                        width={(Math.floor(theme.fullWidth * 0.8) % 2 == 0 ? Math.floor(theme.fullWidth * 0.8) : Math.floor(theme.fullWidth * 0.8) + 1)}
                        height={475}
                        style={{ paddingBottom: 20 }}
                        source={{ uri: fileSelected }} />
                    <STYLED.InputView>
                        <STYLED.DetailsImageInputView>
                            <STYLED.DetailsImageInput
                                onChangeText={setDescription}
                                placeholder="Write desctiption"
                                placeholderTextColor={theme.colors.gray.light}
                            />
                        </STYLED.DetailsImageInputView>
                        <STYLED.DetailsImageInputView>
                            <STYLED.DetailsImageInput
                                onChangeText={setLocation}
                                placeholder="Write Location"
                                placeholderTextColor={theme.colors.gray.light}
                            />
                        </STYLED.DetailsImageInputView>
                        <STYLED.SelectView>
                            <Select
                                onChange={setSelectCategory}
                                options={options}
                                placeholder={"Select Category"}
                                isMulti
                                styles={STYLED.selectStyles}
                            />
                        </STYLED.SelectView>
                        <STYLED.ButtonView>
                            <STYLED.SubmitButton style={{ backgroundColor: theme.colors.green_light_secondary, opacity: setDisabled ? 0.5 : 1 }} disabled={setDisabled} onPress={() => onUpload()}>
                                <STYLED.SubmitButtonText>Submit</STYLED.SubmitButtonText>
                            </STYLED.SubmitButton>
                            <STYLED.CancelButton onPress={() => navigation.navigate(screenName.HOME)}>
                                <STYLED.CancelButtonText>Cancel</STYLED.CancelButtonText>
                            </STYLED.CancelButton>
                        </STYLED.ButtonView>
                    </STYLED.InputView>
                </STYLED.SetImageUploadView>
                : <STYLED.DropZoneView>
                    <Dropzone onDrop={onDropImage}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'dropzone' })} style={STYLED.divStyles}>
                                <STYLED.DropZoneText>
                                    Drag or Click here to Upload your Image
                            </STYLED.DropZoneText>
                                <input type="file" onChange={onChangeImage} {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>
                </STYLED.DropZoneView>}
            {fileSelected === '' && <STYLED.BackButton style={{ marginTop: 15 }} onPress={() => navigation.navigate(screenName.HOME)}>
                <STYLED.BackButtonText>Back</STYLED.BackButtonText>
            </STYLED.BackButton>}
        </STYLED.FullPage>
    )
}

export default UploadScreen
