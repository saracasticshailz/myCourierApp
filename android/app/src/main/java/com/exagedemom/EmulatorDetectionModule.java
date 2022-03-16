package com.exagedemom;

import android.content.Context;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class EmulatorDetectionModule extends ReactContextBaseJavaModule{


    public EmulatorDetectionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "EmulatorDetectionModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public boolean isEmulator(Callback success, Callback error){


        String model = Build.MODEL;
        Log.d("TAG", "model=" + model);
        String product = Build.PRODUCT;
        Log.d("TAG", "product=" + product);
        boolean isEmulator = false;
        if (product != null) {
          isEmulator= product.equals("sdk") || product.contains("_sdk") || product.contains("sdk_");
        }
        Log.d("TAG", "isEmulator=" + isEmulator);
        success.invoke(isEmulator);
        return isEmulator;



    }

}
