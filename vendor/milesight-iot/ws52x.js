function decodeUplink(input) {
    var res = Decoder(input.bytes, input.fPort);
    if (res.error) {
        return {
            errors: [res.error],
        };
    }
    return {
        data: res,
    };
}
/**
 * Payload Decoder for The Things Network
 *
 * Copyright 2021 Milesight IoT
 *
 * @product WS52x
 */
function Decoder(bytes, port) {
    var decoded = {};

    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // VOLTAGE
        if (channel_id === 0x03 && channel_type === 0x74) {
            decoded.voltage_1 = readUInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        // POWER FACTOR
        else if (channel_id === 0x05 && channel_type === 0x81) {
            decoded.power_1 = bytes[i];
            i += 1;
        }
        // ENERGY SUM
        else if (channel_id === 0x06 && channel_type == 0x83) {
            decoded.energy_1 = readUInt32LE(bytes.slice(i, i + 4));
            i += 4;
        }
        // CURRENT
        else if (channel_id === 0x07 && channel_type == 0xc9) {
            decoded.current_1 = readUInt16LE(bytes.slice(i, i + 2));
            i += 2;
        }
        // STATE
        else if (channel_id === 0x08 && channel_type == 0x70) {
            decoded.digital_1 = bytes[i] == 1 ? "on" : "off";
            i += 1;
        } else {
            break;
        }
    }

    return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readUInt32LE(bytes) {
    var value =
        (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
    return value & 0xffffffff;
}
