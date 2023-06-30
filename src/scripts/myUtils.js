

export async function fetchUserData(testDataPath){
    let testData = await fetch(testDataPath);
    return testData.json();
}


