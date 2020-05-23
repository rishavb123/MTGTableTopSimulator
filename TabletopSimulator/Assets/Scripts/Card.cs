using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class Card
{
    public string oracleId;
    public string name;
    public ImageUri imageUris;

}

[Serializable]
public class ImageUri
{
    public string small;
    public string normal;
    public string large;

    override
    public string ToString()
    {
        return large;
    }
}